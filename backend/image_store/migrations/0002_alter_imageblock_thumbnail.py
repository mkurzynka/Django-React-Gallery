# Generated by Django 5.1.1 on 2024-09-21 08:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('image_store', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imageblock',
            name='thumbnail',
            field=models.ImageField(editable=False, upload_to='images/%Y/%m/%d/'),
        ),
    ]
