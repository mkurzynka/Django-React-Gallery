# Generated by Django 5.1.1 on 2024-09-21 10:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('image_store', '0002_alter_imageblock_thumbnail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imageblock',
            name='thumbnail',
            field=models.ImageField(editable=False, upload_to=''),
        ),
    ]
