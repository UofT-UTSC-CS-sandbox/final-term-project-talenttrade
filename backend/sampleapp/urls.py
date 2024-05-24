from django.urls import path
from .views import *

app_name = 'sampleapp'
urlpatterns = [ 
    path('increment-count/', increment_count, name='increment-count'),
    path('reset-count/', reset_count, name='reset-count'),
    path('get-count/', get_count, name='get-count')
]