from django.db import models
from django.utils.translation import ugettext_lazy as _


# TODO manager
# from . import managers

# Relations
# Attributes - Mandatory
# Attributes - Optional

# Object Manager

# Custom Properties
# @property
# def full_name(self):
#     "Returns the person's full name."
#     return '%s %s' % (self.first_name, self.last_name)

# Methods
# def baby_boomer_status(self):
#     "Returns the person's baby-boomer status."
#     import datetime
#     if self.birth_date < datetime.date(1945, 8, 1):
#         return "Pre-boomer"
#     elif self.birth_date < datetime.date(1965, 1, 1):
#         return "Baby boomer"
#     else:
#         return "Post-boomer"
#
# TODO document mana fields that were ommited i the database
# fields excluded from database
# Meta and String

class Owner(models.Model):
    name = models.CharField(
        primary_key=True,
        max_length=60,
        verbose_name=_("name")
    )

    class Meta:
        verbose_name = _("owner")
        verbose_name_plural = _("owners")
        ordering = ("name",)

    def __str__(self):
        return self.name


class Station(models.Model):
    owner = models.ForeignKey(
        Owner,
        verbose_name=_("owner"),
        related_name="owner",
    )

    id = models.IntegerField(
        primary_key=True,
        verbose_name=_("id"),
    )
    name = models.CharField(
        max_length=60,
        verbose_name=_("name"),
    )
    region = models.CharField(
        max_length=35,
        verbose_name=_("region"),
    )
    longitude = models.FloatField(
        verbose_name=_("longitude"),
    )
    latitude = models.FloatField(
        verbose_name=_("latitude"),
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name=_("is active"),
    )

    # TODO manager
    # objects = managers.StationManager()

    class Meta:
        verbose_name = _("station")
        verbose_name_plural = _("stations")

    def __str__(self):
        return '{name}, {region}'.format(name=self.name, region=self.region)


class LawValue(models.Model):
    value_type = models.CharField(
        primary_key=True,
        max_length=60,
        verbose_name=_("law value type"),
    )

    class Meta:
        verbose_name = _("law value")
        verbose_name_plural = _("law values")

    def __str__(self):
        return self.value_type


class Pollutant(models.Model):
    law_values = models.ManyToManyField(
        LawValue,
        verbose_name=_("pollutants law values"),
        related_name="pollutants",
        through="PollutantLawValue",
    )

    name = models.CharField(
        max_length=35,
        verbose_name=_("name"),
        unique=True,
    )
    fullname = models.CharField(
        max_length=60,
        verbose_name=_("verbose name"),
        null=True,
    )
    mana_id = models.IntegerField(
        verbose_name=_("mana id"),
        null=True,
    )
    type = models.IntegerField(
        verbose_name=_("type id"),
    )

    class Meta:
        verbose_name = _("pollutant")
        verbose_name_plural = _("pollutants")

    def __str__(self):
        return '{name} - {fullname}'.format(name=self.name, fullname=self.fullname)


class PollutantLawValue(models.Model):
    pollutant = models.ForeignKey(
        Pollutant,
        verbose_name=_("pollutant")
    )
    law_value = models.ForeignKey(
        LawValue,
        verbose_name=_("law value type")
    )
    value = models.FloatField(
        verbose_name=_("value")
    )
    units = models.CharField(
        max_length=35,
        verbose_name=_("units")
    )

    class Meta:
        verbose_name = _("pollutant")
        verbose_name_plural = _("pollutants")
        unique_together = ("pollutant", "law_value")

    def __str__(self):
        return '{law_value} of {pollutant} is {value} {units}'.format(pollutant=self.pollutant,
                                                                      law_value=self.law_value, value=str(self.value),
                                                                      units=self.units)


class Measurement(models.Model):
    station = models.ForeignKey(
        Station,
        verbose_name=_("station"),
        related_name="measurements",
        db_index=True,
    )
    pollutant = models.ForeignKey(
        Pollutant,
        verbose_name=_("pollutant"),
        related_name="measurements",
        db_index=True,
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
        null=True,
    )
    units = models.CharField(
        max_length=10,
        verbose_name=_("units"),
    )
    status = models.IntegerField(
        verbose_name=_("status id"),
    )
    is_valid = models.BooleanField(
        default=True,
        verbose_name=_("is measurement valid"),
        db_index=True,
    )
    added = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_("inserted to database"),
    )

    class Meta:
        verbose_name = _("measurement")
        verbose_name_plural = _("measurements")
        get_latest_by = "measured"

    def __str__(self):
        return '{pollutant}: {value} {units}, Valid: {valid}, Coordinate: ({longitude}, {latitude}, at {measured})'.format(
            pollutant=str(self.pollutant), units=self.units, value=str(self.value), valid=str(self.is_valid),
            longitude=str(self.longitude), latitude=str(self.latitude), measured=str(self.measured))
