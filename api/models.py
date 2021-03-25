from django.db import models

class Player(models.Model):
  name = models.CharField(max_length=150, default="")
  score = models.IntegerField(default=0)
  created_at = models.DateTimeField(auto_now_add=True)
  

  def __str__( self ):
    return str( self.name )

class GameHistory(models.Model):
  player = models.ForeignKey(Player, on_delete=models.RESTRICT)
  opponent_name = models.CharField(max_length=150, default="")
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
      return self.player.name
  
