# Generated by Django 4.1.2 on 2022-10-30 05:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_cart_img'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='discount',
            field=models.BooleanField(null=True),
        ),
    ]