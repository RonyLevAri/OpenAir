import datetime
import json

from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from django.core import serializers

from . import models


def measurements(request):
    data_model = models.Measurement.objects.filter(measured__gte=datetime.date(2017, 5, 19), station_id=1,
                                                   pollutant_id=1)
    the_json = serializers.serialize('json', data_model)
    print(the_json)
    return HttpResponse(the_json)


def stations(request):
    data_model = models.Station.objects.all()
    the_json = str(serializers.serialize('json', data_model))
    return HttpResponse(the_json)


def pollutants(request):
    data_model = models.Pollutant.objects.all()
    the_json = serializers.serialize('json', data_model)
    print(the_json)
    return HttpResponse(the_json)
