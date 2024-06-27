from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('posts/', include('posts.urls')),
    path('accounts/', include('accounts.urls')),
    path('ratings/', include('ratings.urls')),
    # path('reviews/', include('reviews.urls')),
]
