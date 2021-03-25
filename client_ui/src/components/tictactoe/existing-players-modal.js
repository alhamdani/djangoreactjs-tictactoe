import React from 'react';

export default function ExistingPlayersModal( { selectPlayerFn, closeFn, playerOneId, players } ){

  function playerLists(){
    if( !players.length ) return <li className='name-list'>No entry</li>
    return players.map((item,idx)=>{
      return (
        <li 
          className='name-list' 
          style={{cursor:'pointer'}} 
          key={idx} onClick={ ()=>selectPlayerFn(item) }>{item.name}</li>
      )
    })
  }
  return(
    <div className='modal' style={{zIndex:'9999'}}>
      <div className='content' style={{height:'300px', overflow:'auto'}}>
        <h4 className='header'>Players who once won:</h4>
        <div className='body'>
          <ul style={{listStyle:'none', margin : 0, padding : 0}}>
            {playerLists()}
          </ul>
          <br/>
          <br/>
          <br/>
          <br/>
          <button style={{width:'150px'}} onClick={closeFn}>Close</button>
        </div>
      </div>
    </div>
  )
}