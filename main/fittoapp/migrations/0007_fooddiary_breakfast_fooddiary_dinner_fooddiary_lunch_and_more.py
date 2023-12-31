# Generated by Django 4.2.3 on 2023-08-07 03:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fittoapp', '0006_userbodyreq_tdee'),
    ]

    operations = [
        migrations.AddField(
            model_name='fooddiary',
            name='breakfast',
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AddField(
            model_name='fooddiary',
            name='dinner',
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AddField(
            model_name='fooddiary',
            name='lunch',
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='fooddiary',
            name='date',
            field=models.DateField(default='2023-8-7', null=True),
        ),
    ]
