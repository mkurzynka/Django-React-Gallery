from django.urls import path
from .views import ImagePreviewBlockView, ImageBlockView

app_name = "image_store"

urlpatterns = [
    path("gallery/<index>/", ImageBlockView.as_view(), name="gallery_view"),
    path(
        "gallery/preview/<index>/",
        ImagePreviewBlockView.as_view(),
        name="gallery_thumbnail_view",
    ),
]
