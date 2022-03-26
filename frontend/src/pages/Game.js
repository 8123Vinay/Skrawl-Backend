import React, { useContext, useState } from 'react'
import GameArea  from './GameArea'
import WaitingArea  from './WaitingArea'
import { gameContext } from '../App'


export default function Game() {
    const {startState}=useContext(gameContext);
    // let fun=function (){
    //   if(startState){
    //     return(
    //       <GameArea />
    //     )
    //   }
    //   else{
    //     return(
    //       <WaitingArea />
    //     )
    //   }
    // }

    

  return (
    <div>
       {startState ? <GameArea/> : <WaitingArea />}
       <p>Hello</p>
    </div>
  )
}
