from django.urls import path
from .views import index
urlpatterns = [
    path('', index),
    path('leaderboards/', index),
    path('tictactoegame/', index),
    
]
