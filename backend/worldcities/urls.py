from django.urls import path
from .views import CitySearchView

app_name = 'worldcities'

urlpatterns = [
    path('search/', CitySearchView.as_view(), name='city-search'),
]
