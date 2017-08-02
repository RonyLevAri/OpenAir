# -*- coding: utf-8 -*-
import datetime
from http.client import HTTPResponse
from os.path import join, abspath, dirname
import json

from django.test import TestCase

from . import models
from . import miner


# TODO improve test suit - miner coverage is only 68%
class TestMinerFunctionality(TestCase):
    __dummy_stations = []

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        file_path = join(abspath(dirname(__file__)), 'test_dummy_data.txt')
        with open(file_path, 'r') as f:
            content = f.readlines()
            self.__dummy_stations = [json.loads(x.strip()) for x in content]

    def test_station_list_fetching_api(self):
        response = miner._fetch_from_mana(miner._STATION_FETCH_ROUTE)
        self.assertIsInstance(response, HTTPResponse)
        self.assertEqual(response.code, 200)

    def test_station_list_fetching_api_error(self):
        bad_url = 'not a url'
        with self.assertRaises(TypeError):
            miner._fetch_from_mana(bad_url)

    def test_station_list_extraction(self):
        response = miner._fetch_from_mana(miner._STATION_FETCH_ROUTE)
        json = miner._convert_http_response_to_json(response)
        station_list = miner._extract_station_id_list_from_json(json)
        self.assertEqual(station_list[:3], [1, 2, 3])

    def test_station_parsing(self, station_id=1):
        station_rout = ''.join([miner._STATION_FETCH_ROUT_PREFIX, str(station_id), miner._STATION_FETCH_ROUTE_POSTFIX])
        response = miner._fetch_from_mana(station_rout)
        json = miner._convert_http_response_to_json(response)
        parsed_station_data = miner._parse_single_station_json_response(json)
        self.assertNotEqual(parsed_station_data, None)
        self.assertIsInstance(parsed_station_data, dict)
        owner_data = miner._unpack_data(parsed_station_data, miner._OWNER)
        self.assertNotEqual(owner_data, None)
        station_data = miner._unpack_data(parsed_station_data, miner._STATION)
        self.assertNotEqual(station_data, None)
        return parsed_station_data

    def test_saving_station_data_to_database(self):
        for i in range(2):
            for s in self.__dummy_stations:
                parsed_station_data = miner._parse_single_station_json_response(s)
                miner._save_to_database(parsed_station_data)

            owners = models.Owner.objects.all().count()
            self.assertEqual(owners, 4)
            stations = models.Station.objects.all().count()
            self.assertEqual(stations, 4)
            pollutants = models.Pollutant.objects.all().count()
            self.assertEqual(pollutants, 24)
            measurements = models.Measurement.objects.all().count()
            self.assertEqual(measurements, 36)

    def test_owner_name_assignment(self):
        name = miner._assign_name_if_owner_undefined(None)
        self.assertEqual(name, 'בעלים לא מוגדר')


class TestModels(TestCase):
    def test_models_creation(self):
        now = datetime.datetime.now()
        measurements = []

        owner1, created1 = models.Owner.objects.update_or_create(name="owner1")
        owner2, created2 = models.Owner.objects.update_or_create(name="owner2")
        owner3, created3 = models.Owner.objects.update_or_create(name="owner2")
        self.assertTrue(created1)
        self.assertTrue(created2)
        self.assertFalse(created3)
        self.assertEqual(owner2, owner3)

        station_fields = {'owner': owner1, 'name': 'Jerusalem', 'region': 'Jerusalem', 'longitude': 0.0,
                          'latitude': 0.0,
                          'is_active': False}
        station1, created4 = models.Station.objects.update_or_create(id=1, defaults=station_fields)
        station_fields = {'owner': owner2, 'name': 'Jerusalem', 'region': 'Jerusalem', 'longitude': 0.0,
                          'latitude': 0.0,
                          'is_active': False}
        station2, created5 = models.Station.objects.update_or_create(id=1, defaults=station_fields)
        self.assertTrue(created4)
        self.assertFalse(created5)
        self.assertNotEqual(station1.owner, station2.owner)
        self.assertEqual(station2.owner, owner2)

        pollutant_fields = {'mana_id': 1, 'name': 'NOX', 'fullname': 'nox my ass', 'type': 49}
        pollutant1, created1 = models.Pollutant.objects.update_or_create(**pollutant_fields)
        self.assertTrue(created1)
        print(pollutant1)

        measurement_fields = {'station': station2, 'pollutant': pollutant1, 'measured': now,
                              'value': 7.9, 'units': 'pss', 'status': 1, 'is_valid': True, 'longitude': 0.0,
                              'latitude': 0.0}
        measurements.append(models.Measurement(**measurement_fields))
        measurement_fields = {'station': station2, 'pollutant': pollutant1, 'measured': now,
                              'value': 7.9, 'units': 'pss', 'status': 1, 'is_valid': True, 'longitude': 0.0,
                              'latitude': 0.0}
        measurements.append(models.Measurement(**measurement_fields))
        models.Measurement.objects.bulk_create(
            measurements
        )
