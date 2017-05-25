import datetime

from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from django.core import serializers

from . import models


def time_line(request):
    data_model = models.Measurement.objects.filter(measured__gte=datetime.date(2017, 5, 19), station_id=1, pollutant_id=1)
    the_json = serializers.serialize('json', data_model)
    print(the_json)
    return HttpResponse(the_json)
