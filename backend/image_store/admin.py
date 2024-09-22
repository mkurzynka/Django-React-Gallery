"""
Defines admin panel for image_store app
"""

from django.contrib import admin

from .models import ImageBlock


class ImageBlockAdmin(admin.ModelAdmin):
    """Customization of Django admin panel for ImageBlock model"""

    ### Assumption - We do not want to allow admin toc hange the thumbnail
    exclude = ("thumbnail",)


admin.site.register(ImageBlock, ImageBlockAdmin)
