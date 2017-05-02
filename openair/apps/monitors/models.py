from django.db import models
from django.utils.translation import ugettext_lazy as _


# TODO manager
# from . import managers


# Relations
# Attributes - Mandatory
# Attributes - Optional
# Object Manager
# Custom Properties
# Methods
# Meta and String


# Create your models here.
class Owner(models.Model):

    name = models.CharField(
        primary_key=True,
        max_length=35,
        verbose_name=_("name")
    )

    class Meta:
        verbose_name = _("owner")
        verbose_name_plural = _("owners")
        ordering = ("name",)

    def __str__(self):
        return self.name


class Station(models.Model):

    owners = models.ForeignKey(
        Owner,
        verbose_name=_("owner"),
        related_name="owner",
    )

    id = models.IntegerField(
        primary_key=True,
        verbose_name=_("id"),
    )
    name = models.CharField(
        max_length=35,
        verbose_name=_("name"),
    )
    timebase = models.IntegerField(
        verbose_name=_("timebase"),
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name=_("is active"),
    )
    region = models.CharField(
        max_length=35,
        verbose_name=_("region"),
    )

    # TODO manager
    # objects = managers.StationManager()

    class Meta:
        verbose_name = _("station")
        verbose_name_plural = _("stations")
        ordering = ("id", "is_active",)

    def __str__(self):
        return self.name


class LawValue(models.Model):

    value_type = models.CharField(
        max_length=35,
        verbose_name=_("type"),
    )

    class Meta:
        verbose_name = _("law value")
        verbose_name_plural = _("law values")
        ordering = ("value_type",)

    def __str__(self):
        return self.value_type


class Pollutant(models.Model):

    law_values = models.ManyToManyField(
        LawValue,
        verbose_name=_("pollutants law values"),
        related_name="pollutants"
    )

    id = models.IntegerField(
        primary_key=True,
        verbose_name=_("id"),
    )
    name = models.CharField(
        max_length=35,
        verbose_name=_("name"),
        unique=True,
    )
    fullname = models.CharField(
        max_length=60,
        verbose_name=_("verbose name"),
        unique=True,
    )
    type = models.IntegerField(
        verbose_name=_("type id"),
    )

    class Meta:
        verbose_name = _("pollutant")
        verbose_name_plural = _("pollutants")
        ordering = ("id", "name",)

    def __str__(self):
        return self.name


class Monitor(models.Model):

    station = models.ForeignKey(
        Station,
        verbose_name=_("station"),
        related_name="monitors"
    )
    pollutant = models.ForeignKey(
        Pollutant,
        verbose_name=_("pollutant"),
        related_name="monitors",
    )

    id = models.IntegerField(
        primary_key=True,
        verbose_name=_("id"),
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name=_("is active"),
    )
    units = models.CharField(
        max_length=35,
        verbose_name=_("units of measurement"),
    )

    class Meta:
        verbose_name = _('measurement')
        verbose_name_plural = _('measurements')
        ordering = ("station", "pollutant", "is_active",)

    def __str__(self):
        return 'Pollutant measured: {pollutant}, Units: {units}'.format(pollutant=self.pollutant, units=self.units)


class Measurement(models.Model):

    monitor = models.ForeignKey(
        Monitor,
        verbose_name=_("monitor"),
        related_name="measurements"
    )
    pollutant = models.ForeignKey(
        Pollutant,
        verbose_name=_("pollutant"),
        related_name="measurements"
    )

    id = models.BigAutoField(
        primary_key=True,
        verbose_name=_("id"),
    )
    measured = models.DateTimeField(
        verbose_name=_("measured on"),
    )
    longitude = models.FloatField(
        verbose_name=_("longitude"),
    )
    latitude = models.FloatField(
        verbose_name=_("latitude"),
    )
    value = models.FloatField(
        verbose_name=_("value"),
    )
    units = models.CharField(
        max_length=35,
        verbose_name=_("units"),
    )
    status = models.IntegerField(
        verbose_name=_("status id"),
    )
    is_valid = models.BooleanField(
        default=True,
        verbose_name=_("is measurement valid"),
    )
    timestamp = models.DateTimeField(
        auto_now=True,
        verbose_name=_("queried on"),
    )

    class Meta:
        verbose_name = _('measurement')
        verbose_name_plural = _('measurements')
        ordering = ("pollutant", "is_valid",)

    def __str__(self):
        return 'Pollutant: {pollutant}, Units: {units}, Value: {value}, Valid: {valid}, Coordinate: ({longitude},{latitude})'.format(
            pollutant=self.pollutant, units=self.units, value=self.value, valid=self.is_valid, longitude=self.longitude,
            latitude=self.latitude)
