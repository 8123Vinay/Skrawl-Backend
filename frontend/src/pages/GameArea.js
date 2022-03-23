import React, { useContext, useState } from 'react'
import { gameContext } from '../App'
import {Canvas,Users,Message} from '../components'
export default function GameArea() {
  const { socket, userNames, setUserNames,roomId,setRoomId,groupMessage,setGroupMessage } = useContext(gameContext)
  


  if(socket){
    socket.on('end-round',(message)=>{
      console.log(message)
    })
  } 
 

  return (
    <div>
      <button onClick={()=>{
        socket.emit('startNewRound', roomId)
      }} className="w-12 h-8 bg-blue-600">StartNewRound</button>
      <h1>Hello game</h1>
      <Message />
      <Users />
       </div>
     
  
  )
}


