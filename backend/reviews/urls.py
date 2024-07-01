from django.urls import path
from . import views

urlpatterns = [
  path("", views.ReviewListCreate.as_view(), name='create-review'),
  path("<int:pk>/", views.RatingRetrieveUpdateDestroy.as_view(), name="r-u-d-review"),
  path("all/", views.GetAll, name='get-reviews'),
]