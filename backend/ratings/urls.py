from django.urls import path
from . import views

urlpatterns = [
  path("", views.RatingListCreate.as_view(), name="create-rating"),
  path("<int:pk>/", views.RatingRetrieveUpdateDestroy.as_view(), name='r-u-d-rating'),
  path("avg/", views.GetAvgRating.as_view(), name='get-avg'),
  path("rating/", views.GetRating.as_view(), name='get-rating'),
]