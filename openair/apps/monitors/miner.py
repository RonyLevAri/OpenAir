"""
The miner module uses the Israeli network of outdoor air pollution monitors RESTful API
to fetch air pollution data collected in the monitors and save this data in the application's database.

The module is designed to run as a standalone module while using the Django's environment, specifically the ORM.
DON'T FORGET TO CONFIGURE SYSTEM PATH IN MAIN

 
DATA:
-----
1. Monitor station list API route: 
2. Single station API route: 
 
HAPPY PATH: 
-----------
In order to achieve its goals, the module:
1. Fetches the list of all monitoring stations available
2. Fetches each monitoring station data 
3. Parses each monitoring station data into model objects 
4. Saves the model objects in the database
  
  
TODO:
-----
Module exceptions should include:
1. ApiFetchException
2. DataParsingException
3. DataPersistenceException
      
Logging and exception handling
     
Documentation
     
Decide which functions should be "private"
     
Database optimizations - see TODO documented in functions

Improve test suit
   
NOTES:
------
Maybe in the future the I/O to MANA could be done using multi threading, but it wasn't done 
since they explicitly ask in their api instruction to not put load on their servers and to send requests one at a time
see http://www.sviva.gov.il/subjectsEnv/SvivaAir/AirQualityData/NationalAirMonitoing/Pages/Developers.aspx  
"""
import logging
import json
from urllib.request import urlopen

try:
    from openair.apps.monitors import models
except ImportError as e:
    pass

_STATION_FETCH_ROUTE = 'http://www.svivaaqm.net/api/stations?type=json'
_STATION_FETCH_ROUT_PREFIX = 'http://www.svivaaqm.net/api/stations/'
_STATION_FETCH_ROUTE_POSTFIX = '?getLatestValue=true&type=json'

_OWNER = 'owner'
_STATION = 'station'
_SEARCH_KEY = 'key'
_DEFAULTS = 'defaults'
_MONITORS = 'monitors'
_POLLUTANT = 'pollutant'
_MEASUREMENT = 'measurement'


def _fetch_from_mana(url):
    try:
        return urlopen(url)
    except ValueError as e:
        message = '{error}: fetch_from_mana(url)'.format(error=e, monitor_json=url)
        logging.error(message)
        raise message


def _convert_http_response_to_json(http_response):
    json_format = json.load(http_response)
    return json_format


def _extract_station_id_list_from_json(station_list_json_response):
    stations_list = [station_dict.get('ID') for station_dict in station_list_json_response]
    return stations_list


def _parse_single_station_json_response(station_json_response):
    data = {}

    owner_data = _extract_owner_data(station_json_response)
    data.update({_OWNER: owner_data})

    station_data = _extract_station_data(station_json_response)
    data.update({_STATION: station_data})

    monitors_data = _extract_monitors_data(station_json_response)
    data.update({_MONITORS: monitors_data})

    return data


def _extract_owner_data(station_json_response):
    _ = station_json_response

    try:
        owner_name = str(_.get('Owner'))
        owner_name = _assign_name_if_owner_undefined(owner_name)
        owner_data = {
            _SEARCH_KEY: {'name': owner_name},
            _DEFAULTS: None
        }

        return owner_data
    except AttributeError as e:
        message = '{error}: extract_owner_data(station_json_response)'.format(error=e,
                                                                              monitor_json=station_json_response)
        logging.error(message)
        raise message


def _assign_name_if_owner_undefined(owner_name):
    if not owner_name or owner_name == 'None':
        owner_name = 'בעלים לא מוגדר'
    return owner_name


def _extract_station_data(station_json_response):
    _ = station_json_response

    try:
        station_id = _.get('ID')
        name = str(_.get('Name'))
        region = str(_.get('Region'))
        is_active = _.get('Active')
        location = _.get('Location')
        latitude = location.get('Latitude')
        longitude = location.get('Longitude')

        station_data = {
            _SEARCH_KEY: {'id': station_id},
            _DEFAULTS: {'name': name, 'region': region, 'longitude': longitude, 'latitude': latitude,
                        'is_active': is_active}
        }
        return station_data
    except AttributeError as e:
        message = '{error}: extract_monitors_data_helper(station_json_response)'.format(error=e,
                                                                                        monitor_json=station_json_response)
        logging.error(message)
        raise message


def _extract_monitors_data(station_json_response):
    monitors = station_json_response.get('Monitors')
    if monitors:
        monitors_data = [_extract_monitors_data_helper(monitor) for monitor in monitors]
        return monitors_data


def _extract_monitors_data_helper(monitor_json):
    try:
        pollutant_data = _extract_pollutant_data(monitor_json)
        measurement_data = _extract_measurement_data(monitor_json)
        return {
            _POLLUTANT: pollutant_data,
            _MEASUREMENT: measurement_data
        }
    except AttributeError as e:
        message = '{error}: extract_monitors_data_helper(monitor_json)'.format(error=e, monitor_json=monitor_json)
        logging.error(message)
        raise message


def _extract_measurement_data(monitor_json):
    _ = monitor_json

    try:
        units = str(_.get('Units'))
        latest_value = _.get('LatestValue')
        value = latest_value.get('Value')
        timestamp = latest_value.get('DateTime')
        is_valid = latest_value.get('Valid')
        status = latest_value.get('Status')
        measurement_data = {
            _SEARCH_KEY: {'measured': timestamp, 'value': value, 'units': units, 'status': status,
                          'is_valid': is_valid},
            _DEFAULTS: None
        }
        return measurement_data
    except AttributeError as e:
        message = '{error}: extract_measurement(monitor_json)'.format(error=e, monitor_json=monitor_json)
        logging.error(message)
        raise message


def _extract_pollutant_data(monitor_json):
    _ = monitor_json

    try:
        name = str(_.get('Name'))
        fullname = str(_.get('FriendlyName'))
        pollutant_id = _.get('PollutantID')
        type_id = _.get('TypeID')
        pollutant_data = {
            _SEARCH_KEY: {'name': name},
            _DEFAULTS: {'mana_id': pollutant_id, 'fullname': fullname, 'type': type_id}
        }
        return pollutant_data
    except AttributeError as e:
        message = '{error}: extract_pollutant(monitor_json)'.format(error=e, monitor_json=monitor_json)
        logging.error(message)
        raise message


def _save_to_database(data):
    # TODO mechanism to reduce calls to database for items that do not usually change
    if not data:
        massage = 'problem with model data from monitors'
        logging.error(massage)
        raise TypeError(massage)

    owner = _save_owner(data)
    station = _save_station(data, owner)
    _save_monitors(data, station)


def _save_owner(data):
    owner_data = _unpack_data(data, _OWNER)
    owner, created = models.Owner.objects.update_or_create(defaults=owner_data.get(_DEFAULTS),
                                                           **owner_data.get(_SEARCH_KEY))
    return owner


def _save_station(data, owner):
    station_data = _unpack_data(data, _STATION)
    station_data.get(_DEFAULTS).update({_OWNER: owner})
    station, created = models.Station.objects.update_or_create(defaults=station_data.get(_DEFAULTS),
                                                               **station_data.get(_SEARCH_KEY))
    return station


def _save_monitors(data, station):
    monitors = _unpack_data(data, _MONITORS)
    if monitors:
        for monitor_data in monitors:
            pollutant = _save_pollutant(monitor_data)
            if pollutant:
                _save_measurement(monitor_data, pollutant, station)


def _save_measurement(monitor_data, pollutant, station):
    measurement_data = _unpack_data(monitor_data, _MEASUREMENT)
    # TODO database optimizations - is it a good idea to add location to each measurement
    measurement_data.get(_SEARCH_KEY).update(
        {_STATION: station, _POLLUTANT: pollutant, 'longitude': station.longitude,
         'latitude': station.latitude}
    )
    # TODO database optimizations - is it better to insert all measurement in bulk and not check existence
    models.Measurement.objects.get_or_create(**measurement_data.get(_SEARCH_KEY))


def _save_pollutant(monitor_data):
    pollutant_data = _unpack_data(monitor_data, _POLLUTANT)
    pollutant = None
    if not pollutant_data.get(_SEARCH_KEY).get('name') == 'Spare':
        pollutant, created = models.Pollutant.objects.update_or_create(defaults=pollutant_data.get(_DEFAULTS),
                                                                       **pollutant_data.get(_SEARCH_KEY))
    return pollutant


def _unpack_data(data, model_name):
    try:
        return data.get(model_name)
    except AttributeError as e:
        message = '{error}: unpack_data({data}, {model_name})'.format(error=e, data=data, model_name=model_name)
        logging.error(message)
        raise message


if __name__ == '__main__':
    import sys
    # TODO configure path on deploy
    sys.path.insert(0, '/Users/rony_temp/PycharmProjects/openair/')
    # TODO proper exception handling and logging to module
    import django

    django.setup()

    from openair.apps.monitors import models

    try:
        station_list_response = _fetch_from_mana(_STATION_FETCH_ROUTE)
    except ValueError as e:
        print(e)
    try:
        station_list_json = _convert_http_response_to_json(station_list_response)
    except TypeError as e:
        print(e)

    all_stations_id = _extract_station_id_list_from_json(station_list_json)

    for station_id in all_stations_id:
        try:
            station_response = _fetch_from_mana(
                ''.join([_STATION_FETCH_ROUT_PREFIX, str(station_id), _STATION_FETCH_ROUTE_POSTFIX]))
        except ValueError as e:
            print(e)
        try:
            station_json = _convert_http_response_to_json(station_response)
        except TypeError as e:
            print(e)
        try:
            station_data = _parse_single_station_json_response(station_json)
            _save_to_database(station_data)
        except AttributeError as e:
            print(e)
        except TypeError as e:
            print(e)
