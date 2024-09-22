""" Set of tests for gallery API """

import io
from typing import Tuple

import pytest
from PIL import Image
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework import status
from rest_framework.test import APIClient
from image_store.models import ImageBlock


def generate_image_upload_file(
    color: Tuple[int, int, int],
    size: Tuple[int, int],
    name: str = "test_image.png",
):
    """Generates representation of image with specified color and size"""
    file = io.BytesIO()
    image = Image.new("RGB", size, color=color)
    image.save(file, "PNG")
    file.seek(0)
    return SimpleUploadedFile(name, file.getvalue(), content_type="image/png")


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def test_image():
    """Test image"""
    return generate_image_upload_file((0, 0, 0), (1000, 1000))


@pytest.fixture
def mock_image_generator(mocker):
    """Function that mocks 3rd party api calls"""

    def mock_get(*args, **kwargs):
        # Create a valid image file
        file = io.BytesIO()
        image = Image.new("RGB", (1000, 1000), color="blue")
        image.save(file, "JPEG")
        file.seek(0)

        mock_response = mocker.Mock()
        mock_response.content = file.getvalue()
        mock_response.status_code = 200
        return mock_response

    mock = mocker.patch("requests.get", side_effect=mock_get)
    return mock


@pytest.mark.django_db
class TestImagePreviewBlockView:
    """Test class that checks the preview ViewSet functionality"""

    def test_get_existing_image(self, api_client, test_image):
        """This test aims to check if image is fetched correcty, if it already exists in the DB"""
        image_block = ImageBlock.objects.create(image=test_image)
        url = reverse(
            "image_store:gallery_thumbnail_view", kwargs={"index": image_block.index}
        )
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert response["Content-Type"] == "image/jpeg"

    def test_get_nonexistent_image(self, api_client, mock_image_generator):
        """
        This test check the part of endpoint responsible for creating new image.
        New image is created when user sends GET request with non-existing index.

        In this test we are also mocking the 3rd party image generation api using PIL.
        """
        url = reverse("image_store:gallery_thumbnail_view", kwargs={"index": 999})
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert response["Content-Type"] == "image/jpeg"
        assert ImageBlock.objects.count() == 1


@pytest.mark.django_db
class TestImageBlockView:
    """Test class that checks the gallery endpoint functionality"""

    def test_put_existing_image(self, api_client, test_image):
        """This test checks if exisitng image can be set (override) using put method"""
        image_block = ImageBlock.objects.create(image=test_image)
        url = reverse("image_store:gallery_view", kwargs={"index": image_block.index})
        new_image = generate_image_upload_file(
            (255, 0, 0), (1000, 1000), "new_image.png"
        )
        response = api_client.put(url, {"image": new_image}, format="multipart")
        assert response.status_code == status.HTTP_200_OK
        image_block.refresh_from_db()
        assert "new_image" in image_block.image.name

    def test_put_nonexistent_image(self, api_client, test_image):
        """This test checks that image cannot be uploaded for non-exisitg index"""
        url = reverse("image_store:gallery_view", kwargs={"index": 999})
        response = api_client.put(url, {"image": test_image}, format="multipart")
        assert response.status_code == status.HTTP_404_NOT_FOUND
