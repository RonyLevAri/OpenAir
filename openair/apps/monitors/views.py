import datetime

from django.http import HttpResponse
from django.core import serializers

from . import models


def measurements(request):
    if 'station' and 'pollutant' in request.GET and request.GET['station'] and request.GET['pollutant']:
        station = request.GET['station']
        pollutant = request.GET['pollutant']
        data_model = models.Measurement.objects.filter(measured__gte=datetime.date(2017, 6, 3), station_id=station,
                                                       pollutant_id=pollutant).order_by('measured')
        the_json = str(serializers.serialize('json', data_model))
        return HttpResponse(the_json)
    else:
        return HttpResponse("query is not valid")


def stations(request):
    data_model = models.Station.objects.all()
    the_json = str(serializers.serialize('json', data_model))
    return HttpResponse(the_json)


def pollutants(request):
    data_model = models.Pollutant.objects.all()
    the_json = serializers.serialize('json', data_model)
    print(the_json)
    return HttpResponse(the_json)
