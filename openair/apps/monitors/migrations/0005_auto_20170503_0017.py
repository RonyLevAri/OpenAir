# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-02 21:17
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('monitors', '0004_auto_20170503_0011'),
    ]

    operations = [
        migrations.RenameField(
            model_name='station',
            old_name='owners',
            new_name='owner',
        ),
    ]