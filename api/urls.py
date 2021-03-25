
from django.urls import path
from .views import PlayerView, getAllPlayerGameHistory, WinnerChecker

urlpatterns = [
    path('player/', PlayerView.as_view()),
    path('savewinnerdata/', PlayerView.as_view()),
    path('getallplayergamehistory/', getAllPlayerGameHistory),
    path('checkwinner/', WinnerChecker.as_view()),
]
