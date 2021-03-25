import React, {useState, useEffect} from 'react';

import axios from 'axios';

import Square from './square.js'; 
import NameFormModal from './name-form-modal.js';
import WinnerModal from './winner-modal.js';

export default function TicTacToeBoard(props){

  const [isPlayerOne, setIsPlayerOne] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [allSquares, setAllSquares] = useState(Array(9).fill(null));
  

  const [counter, setCounter] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isPlayerNameFormVisible, setPlayerNameFormVisible]=useState(true);

  const [isWinnerModalVisible, setWinnerModalVisible] = useState(false);
  const [winnerName, setWinnerName] = useState('');

  const [playerOneName, setPlayerOneName] = useState("");
  const [playerTwoName, setPlayerTwoName] = useState("");
  const [playerOneId, setPlayerOneId] = useState("");
  const [playerTwoId, setPlayerTwoId] = useState("");

  // all_squares -> updated values of all squares
  function checkWinner(all_squares) {
    // query for check winner, logic define in backend
    return axios.post('/api/checkwinner/', { 'all_squares' : all_squares })
  }
  // update cell and also check the winner after every player moves
  function updatePlayerTurn( index ){
    if( !isFinished ){
      let all_squares = [...allSquares];
      all_squares[ index ] = isPlayerOne ? 'O' : 'X';

      setAllSquares(all_squares);
      checkWinner(all_squares)
        .then((rs)=>{
          let winner = rs.data.winner;
          // no winner is found
          if(!winner){
            // if all square are not yet filled
            if( counter < 8 ){
              // console.log(counter);
              setIsPlayerOne(!isPlayerOne);
              setCounter(counter+1);
            }else{
              // if the game is draw
              setIsFinished(true);
              setWinnerName(null);
              setWinnerModalVisible(true);
            }
          }else{
            let obj = {};
            let winner_name = '', opponent_name='', isPlayerOneWinner=true;
            // player one
            if(winner == 'O'){
              if(playerOneId) obj.player_id = playerOneId;
              winner_name = playerOneName;
              opponent_name = playerTwoName;
            }else{
              if(playerTwoId) obj.player_id = playerTwoId;
              winner_name = playerTwoName;
              opponent_name = playerOneName;
              isPlayerOneWinner = false;
            }

            obj.name = winner_name;
            obj.opponent_name = opponent_name;
            setWinnerModalVisible(true);
            setWinnerName(winner_name);
            setIsFinished(true);
            // save the winner info to database
            axios.post('/api/savewinnerdata/', obj)
              .then((rs)=>{
                let data = rs.data;
                if(data.new_player_id){
                  if(isPlayerOneWinner){
                    setPlayerOneId(data.new_player_id);
                  }else{
                    setPlayerTwoId(data.new_player_id);
                  }
                }
                console.log(rs);
              })
              .catch((err)=>{
                console.error('Something went wrong while saving the winner info!');
              })
            
          }
        })
        .catch((err)=>alert("Ops something went wrong"))
    }
  }
  // create square
  function boardSquares(){
    let arr = [];
    let _arr = [];
    for(let x = 0; x < 9; x++ ){
      _arr.push(
        <Square 
          key={x} 
          index={x}
          allSquares={allSquares}
          updatePlayerTurnFn={()=>{updatePlayerTurn(x)}} 
          isPlayerOne={isPlayerOne}/>
      );
      if( ((x+1) % 3) === 0){
        arr.push( <div key={'par'+x} className='btn-row'> {_arr } </div> );
        _arr = [];
      }
    }
    return arr;
  }
  // reset some state values
  function onClickNewGameBtn(){
    let all_squares = allSquares.map((item)=>{
      return null;
    });
    setIsPlayerOne(true);
    setAllSquares(all_squares);
    setIsFinished(false);
    setCounter(0)
  }
  // update player name and Ids
  function setPlayerNameAndIds(name_1, name_2, id_1, id_2){
    setPlayerOneName(name_1);
    setPlayerOneId(id_1);

    setPlayerTwoName(name_2);
    setPlayerTwoId(id_2);

    setPlayerNameFormVisible(false);
    setIsStarted(true);
  }
  
  return (
    <div>
      <div style={{width:'60%', margin:'auto', textAlign:'center', padding : '10%'}}>
        {
          (isFinished && isWinnerModalVisible) ? (
            <WinnerModal 
              newGameFn={onClickNewGameBtn} 
              winnerName={winnerName}/>
          ) : null
        }
        { isPlayerNameFormVisible ? ( <NameFormModal setPlayerNameAndIdsFn = {setPlayerNameAndIds}/> ) : null }
        {
          isStarted ? (
            <div>
              <h2>{ playerOneName } vs { playerTwoName }</h2>
              <h3>{ isPlayerOne ? ( playerOneName +' turn') :  (playerTwoName + ' turn' )}</h3>
            </div>
          ) : null
        }
        { boardSquares() }
        <br/>
        <div>
          <button onClick={onClickNewGameBtn}>New game</button>
        </div>
      </div>
    </div>
  )
}