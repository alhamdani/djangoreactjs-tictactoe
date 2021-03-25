
import React from 'react';

export default function WinGameHistoryModal( props ){
  let { player, winHistory, closeFn } = props;
  function historyItems(){
    return winHistory.map((item,idx)=>{
      return(
        <div key={idx}>{player.name} vs {item.opponent_name}</div>
      )
    })
  }
  return(
    <div className='modal'>
      <div className='content'>
        <div className='header' style={{textDecoration:'underline'}}>{ player.name } game win history</div>
        <div className='body'>
          {
            historyItems()
          }
        </div>
        <div>
          <br/>
          <button onClick={closeFn}>Close</button>
        </div>
      </div>

    </div>
  )
}