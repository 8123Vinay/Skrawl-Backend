import React, { useContext, useState } from 'react'
import { gameContext } from '../App'
import {Canvas,Users,Message} from '../components'
export default function GameArea() {
  const { socket, userNames, setUserNames,roomId,setRoomId,groupMessage,setGroupMessage } = useContext(gameContext)
  


  


  return (
    <div>
      <h1>Hello from the GameArea</h1>
      <Message />
      <Users />
       </div>
     
  
  )
}


