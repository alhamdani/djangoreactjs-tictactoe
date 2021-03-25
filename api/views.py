from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PlayerSerializer
from .models import Player, GameHistory
from django.db import transaction

# NOTE : the whole app setup only allow function base views to request using GET, POST might not work

# using function based view
def getAllPlayerGameHistory(request):
  data = []
  if 'player_id' in request.GET:
    qs = GameHistory.objects.filter(player_id=request.GET['player_id'])
    for gh in qs:
      data.append({
        'opponent_name' : gh.opponent_name
      })
  
  return JsonResponse({'data':data})






# using class based view with django-restframework below:

# checking the winner logic is in server side just to hide logic
class WinnerChecker(APIView):
  def post(self, request, format=None):
    all_squares = request.data['all_squares']
    data = { 'message' : 'success', 'winner' : None }
    winning_indexes = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for x in winning_indexes:
      a = x[0]
      b = x[1]
      c = x[2]
      if all_squares[a] and all_squares[a] == all_squares[b] and all_squares[a] == all_squares[c]:
        data['winner'] = all_squares[a]
     
    return Response(data)


class PlayerView(APIView):
  def get(self, request, format=None):
    player_id = None
    if 'player_id' in request.GET:
      player_id = request.GET['player_id']
    qs = Player.objects.all().exclude(id=player_id).order_by('-score')
    
    data = PlayerSerializer(qs, many=True).data
    return Response(data, status.HTTP_200_OK)

  def post(self, request, format=None):
    try:
      with transaction.atomic():
        player_id = None
        data_response = { 'message' : 'success' }
        if 'player_id' in request.data:
          player_id = request.data['player_id']
          qs = Player.objects.get(id=player_id)
          qs.score += 1;
          qs.save()
        else:
          request.data['score'] = 1
          
          p = PlayerSerializer(data=request.data)
          if p.is_valid():
            p.save()
            player_id = p['id'].value
            data_response[ 'new_player_id' ] = player_id
      
        opponent_name = request.data['opponent_name']
        gh = GameHistory(player_id = player_id, opponent_name = opponent_name )
        gh.save()

        return Response(data_response, status.HTTP_200_OK)

    except Exception:
      import sys
      print(sys.exc_info())
      return Response({'message':'failed'}, status.HTTP_400_BAD_REQUEST)
    