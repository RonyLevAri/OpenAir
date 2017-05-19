# -*- coding: utf-8 -*-
import datetime
import json

from django.shortcuts import render
from django.utils.timezone import now


def home(request):
    today = datetime.date.today()
    return render(request, "openair/index.html", {'today': today, 'now': now()})


def home_files(request, filename):
    return render(request, filename, {}, content_type="text/plain")


def api(request):
    value = '{"my_key":"the value"}'
    res = json.loads(value)
    return res
    # return render(request, "openair/index.html", {})

