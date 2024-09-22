"""Module defining image_store app ORMs."""

from os import path
from io import BytesIO

from PIL import Image

from django.db import models
from django.core.files.base import ContentFile

from django_image_api.settings import IMAGE_THUMNAIL_SIZE


class ImageBlock(models.Model):
    """
    Model describing one image.
    """

    index = models.AutoField(primary_key=True)
    # Using date as paritioning index to keep media organized
    image = models.ImageField(upload_to="images/%Y/%m/%d/")
    thumbnail = models.ImageField(editable=False)

    class Meta:
        ordering = ["index"]

    def create_thumbnail(self):
        """Creates thumbnail for image on save"""

        # Create path for the thumbnail
        iamge_path_wo_ext, _ = path.splitext(self.image.name)
        thumbnail_path = iamge_path_wo_ext + "-thumbnail" + ".jpg"

        thumbnail = Image.open(self.image)
        thumbnail.thumbnail(IMAGE_THUMNAIL_SIZE)

        temp_thumb = BytesIO()
        thumbnail.save(temp_thumb, "JPEG")
        temp_thumb.seek(0)

        self.thumbnail.save(thumbnail_path, ContentFile(temp_thumb.read()), save=False)
        temp_thumb.close()

    def save(self, *args, **kwargs):
        self.create_thumbnail()
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"Index: {self.index} image: {self.image} image_thumb: {self.thumbnail}"
