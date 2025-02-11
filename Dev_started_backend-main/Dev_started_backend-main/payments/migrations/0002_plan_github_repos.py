# Generated by Django 5.0.1 on 2024-03-04 17:16

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("payments", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="plan",
            name="github_repos",
            field=django.contrib.postgres.fields.ArrayField(
                base_field=django.contrib.postgres.fields.ArrayField(
                    base_field=models.CharField(blank=True, max_length=200), size=None
                ),
                default=[],
                size=None,
            ),
        ),
    ]
