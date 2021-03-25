import React, {useState, useEffect } from 'react';

export default function Square( props ){
  let { isPlayerOne, updatePlayerTurnFn, index, allSquares } = props;
  const [label, setLabel] = useState("");
  function onClickBtn(){
    updatePlayerTurnFn();
  }
  useEffect(()=>{
    if(allSquares[index]){
      setLabel(allSquares[index]);
    }else{
      // this happen when new game button is press
      if(label!=="") setLabel("");
    }
  }, [allSquares])
  if( label === "" ) return <button onClick={onClickBtn}>&nbsp;</button>
  return(
    <button>{label}</button>
  )
}