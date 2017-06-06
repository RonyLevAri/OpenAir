from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^measurements/', views.measurements, name='time_line'),
    url(r'^stations/$', views.stations, name='stations'),
    url(r'^pollutants/$', views.pollutants, name='pollutants'),
]