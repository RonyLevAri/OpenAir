from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.time_line, name='time_line'),
]