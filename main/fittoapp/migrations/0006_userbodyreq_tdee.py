# Generated by Django 4.2.3 on 2023-08-06 09:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fittoapp', '0005_userbodyreq'),
    ]

    operations = [
        migrations.AddField(
            model_name='userbodyreq',
            name='tdee',
            field=models.IntegerField(null=True),
        ),
    ]
