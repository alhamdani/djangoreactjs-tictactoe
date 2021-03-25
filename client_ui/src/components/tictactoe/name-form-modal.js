import axios from 'axios';
import React, { useState, useEffect } from 'react';

import ExistingPlayersModal from './existing-players-modal.js';

export default function NameFormModal( props ){
  let { setPlayerNameAndIdsFn } = props;

  const [players, setPlayers] = useState([]);

  const [playerOne, setPlayerOne] = useState('');
  const [playerTwo, setPlayerTwo] = useState('');
  const [playerOneId, setPlayerOneId] = useState(null);
  const [playerTwoId, setPlayerTwoId] = useState(null);
  // use for updating which player to update when selecting existing player
  const [isPlayerOne, setIsOnPlayerOne] = useState(true);
  const [isPlayerListsModalVisible, setIsPlayerListsModalVisible] = useState(false);

  function sumbitData(ev){
    // console.log('submitting')
    ev.preventDefault();
    setPlayerNameAndIdsFn(playerOne, playerTwo, playerOneId, playerTwoId );
  }
  function setPlayerData(player){
    if( isPlayerOne ) {
      setPlayerOne( player.name );
      setPlayerOneId( player.id );
    }else{
      setPlayerTwo( player.name );
      setPlayerTwoId( player.id );
    }
    setIsPlayerListsModalVisible(false);
  }
  function getAllPlayers(){
    let obj = {params:{}};
    console.log(playerOneId,playerTwoId)
    if(playerOneId){
      obj.params.player_id=playerOneId;
    }
    if(playerTwoId){
      obj.params.player_id=playerTwoId;
    }
    return axios.get('/api/player/', obj) 
  }
  function selectPlayerOne(){
      getAllPlayers()
        .then((rs)=>{
          setPlayers(rs.data);
          setIsOnPlayerOne(true);
          setIsPlayerListsModalVisible(true);
        })
        .catch((err)=>{
          console.error(err);
        })
  }
  function selectPlayerTwo(){
    getAllPlayers()
      .then((rs)=>{
        setPlayers(rs.data);
        setIsOnPlayerOne(false);
        setIsPlayerListsModalVisible(true);
      })
    
  }
  return(
    <div>
      {
        isPlayerListsModalVisible ? ( 
          <ExistingPlayersModal
            players={players}
            selectPlayerFn={ setPlayerData }
            closeFn={()=>{setIsPlayerListsModalVisible(false)}}/> 
        ) : null
      }
      
      <form onSubmit={sumbitData} className='modal'>
        <div className='content'>
          <h3>Welcome to 3T(Tic Tac Toe) game</h3>
          <div className='header'>Please give the players name</div>
          <div className='body'>
            <div style={{margin : '5px'}}>
              <label>Player one </label>
              <input required value={playerOne} onChange={(ev)=>setPlayerOne(ev.target.value)} type='text'/>
              <span style={{color:'violet', cursor:'pointer'}} onClick={selectPlayerOne}> Winners list</span>
            </div>
            <div style={{margin : '5px'}}>
              <label>Player two </label>
              <input required value={playerTwo} onChange={(ev)=>setPlayerTwo(ev.target.value)} type='text'/>
              <span style={{color:'violet', cursor:'pointer'}} onClick={selectPlayerTwo}> Winners list</span>
            </div>
            <div style={{margin : '20px 10px 10px 10px'}}>
              <button type='submit' style={{width:'150px'}}>Play</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    
  )
}