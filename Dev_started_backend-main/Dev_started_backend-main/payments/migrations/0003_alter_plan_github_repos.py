# Generated by Django 5.0 on 2024-03-04 17:27

import django_better_admin_arrayfield.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("payments", "0002_plan_github_repos"),
    ]

    operations = [
        migrations.AlterField(
            model_name="plan",
            name="github_repos",
            field=django_better_admin_arrayfield.models.fields.ArrayField(
                base_field=models.CharField(blank=True, max_length=200),
                default=[],
                size=None,
            ),
        ),
    ]
