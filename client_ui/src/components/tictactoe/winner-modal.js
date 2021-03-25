import React from 'react';

export default function WinnerModal(props){
  let { winnerName, newGameFn } = props;
  return(
    <div className='modal'>
      <div className='content'>
        <div className='header'>{ winnerName ? ( 'The winner is ' + winnerName ) : 'Draw' }</div>
        <div><button onClick={newGameFn}>New game</button></div>
      </div>
    </div>
  )
}