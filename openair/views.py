# -*- coding: utf-8 -*-
import datetime
from django.http import JsonResponse
from django.http import HttpResponse

from django.shortcuts import render
from django.utils.timezone import now


def home(request):
    today = datetime.date.today()
    return render(request, "base.html", {'today': today, 'now': now()})


def home_files(request, filename):
    return render(request, filename, {}, content_type="text/plain")


def api(request):
    response_data = {'Rony': 'Lev Ari',}
    return JsonResponse(response_data, status=201)

