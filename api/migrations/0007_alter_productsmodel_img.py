# Generated by Django 4.1.2 on 2022-10-25 11:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_productsmodel_category_productsmodel_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productsmodel',
            name='img',
            field=models.FileField(null=True, upload_to='static/images/'),
        ),
    ]