import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WinGameHistoryModal from './win-game-history-modal.js';


export default function PlayerLeaderboard(){
  const [players, setPlayers]=useState([]);
  const [selectedPlayer, setSelectedPlayer]=useState(null);
  const [isPlayerWinModalVisible, setIsPlayerWinModalVisible]=useState(false);
  const [winHistory, setWinHistory]=useState([]);

  useEffect(()=>{
    axios.get('/api/player/')
      .then((rs)=>{
        setPlayers(rs.data);
      })
  },[])
  function viewPlayerHistory(player){
    axios.get('/api/getallplayergamehistory/', { params : { 'player_id' : player.id }})
      .then((rs)=>{
        // console.log( rs.data.data);
        setWinHistory(rs.data.data);
        setSelectedPlayer(player);
        setIsPlayerWinModalVisible(true);
      })
  }
  function playerLists(){
    if(!players.length) {
      return <tr><td colSpan="3" style={{textAlign:'center'}}>Nothing to show</td></tr>
    }
    return players.map((item,idx)=>{
      return (
        <tr>
          <td>{item.name}</td>
          <td>{item.score}</td>
          <td style={{cursor:'pointer'}} onClick={()=>{ viewPlayerHistory(item) }}>View</td>
        </tr>
      )
    })
  }
  return(
    <div>
      {
        isPlayerWinModalVisible ? (
          <WinGameHistoryModal
            player={selectedPlayer}
            winHistory={winHistory}
            closeFn={()=>{setIsPlayerWinModalVisible(false)}}/>
        ) : null
      }

      <h3>Leaderboards</h3>
      <table>
        <thead>
          <tr>
            <th style={{width:'150px'}}>Name</th>
            <th>Score</th>
            <th>History</th>
          </tr>
        </thead>
        <tbody>
          { playerLists() }
        </tbody>
      </table>
      

    </div>
  )
}