import React,{ useState, useEffect } from 'react';
import TicTacToeBoard from './board.js';

export default function TicTacToeIdx(){
  const [isLeaderBoardModalVisible, setLeaderBoardModalVisible] = useState(false);
  function showLeaderBoardModal(){
    setLeaderBoardModalVisible(!isLeaderBoardModalVisible);
  }
  return(
    <div>
      <TicTacToeBoard showLeaderBoardFn={showLeaderBoardModal}/>
    </div>
  )
}