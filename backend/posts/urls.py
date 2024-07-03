from django.urls import path
from . import views

urlpatterns = [
  path("", views.PostListCreate.as_view(), name="create-post"),
  path("<int:pk>/", views.PostRetrieveUpdateDestroy.as_view(), name="r-u-d-post"),

  path('need/', views.MostPopularNeed.as_view(), name='most_popular_need'),
  path('offer/', views.MostPopularOffer.as_view(), name='most_popular_offer'),
  path('trade/', views.MostPopularTrade.as_view(), name='most_popular_trade'),

  path('post-need/', views.PostListByNeed.as_view(), name='post_list_by_need'),
  path('post-offer/', views.PostListByOffer.as_view(), name='post_list_by_offer'),
  path('post-trade/', views.PostListByTrade.as_view(), name='post_list_by_trade'),
  path('filter/<str:pk>/<str:pk_list>/<str:offer_list>', views.FilterPosts.as_view(), name="filter"),
]