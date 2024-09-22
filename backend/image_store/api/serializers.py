from rest_framework.serializers import ModelSerializer

from image_store.models import ImageBlock


class ImageBlockSerializer(ModelSerializer):

    class Meta:
        model = ImageBlock
        fields = ["image"]
