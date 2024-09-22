import requests
from django.http import HttpResponse
from django.core.files.base import ContentFile

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from image_store.models import ImageBlock

from django_image_api.settings import IMAGE_GENERATOR_URL

from .serializers import ImageBlockSerializer


class ImagePreviewBlockView(APIView):
    def get(self, request, index):
        try:
            image_block = ImageBlock.objects.get(index=index)
        except ImageBlock.DoesNotExist:
            try:
                # Make a request to a 3rd party to get AI generated image
                response = requests.get(IMAGE_GENERATOR_URL)
                response.raise_for_status()  # Raise an exception for HTTP errors
                # Save the image content to the model's ImageField
                image_name = (
                    f"random_image_{index}.jpg"  # Adjust the file extension if needed
                )

                # Create a new GalleryImage instance
                image_block = ImageBlock(index=index)
                print(f"Index {index}")
                image_block.image.save(
                    image_name, ContentFile(response.content), save=True
                )
            except requests.RequestException as e:
                # Handle any errors that occur during the API request
                Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

        image_file = image_block.thumbnail.open()

        return HttpResponse(image_file, content_type="image/jpeg")


class ImageBlockView(APIView):
    def put(self, request, index):
        try:
            # Try to get the existing image
            image = ImageBlock.objects.get(index=index)
        except ImageBlock.DoesNotExist:
            return Response(
                {"error": "Image not found."}, status=status.HTTP_404_NOT_FOUND
            )

        # Update the existing GalleryImage instance
        serializer = ImageBlockSerializer(
            image, data={"index": index, "image": request.data.get("image")}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
