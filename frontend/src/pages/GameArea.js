import React, { useContext, useState } from 'react'
import { gameContext } from '../App'
import {Canvas,Users,Message} from '../components'
export default function GameArea() {
  const { socket, userNames, setUserNames,roomId,setRoomId,groupMessage,setGroupMessage } = useContext(gameContext)
  const [scores,setScores]=useState([]);

  function ScoresComponent({scores}){
     let array=scores.forEach((user)=>{
        return (
          <p>{user.userName}:{user.score}</p>
        )
      }) 
    return(
      <div>
      <p>Heloo World</p>
         {array}
      </div>
    )
  }

  if(socket){
    socket.on('scores',(message)=>{
       setScores(message);
    })
    
  } 
 

  return (
    <div>
      <ScoresComponent scores={scores} />
      <button onClick={()=>{
        socket.emit('startNewRound', roomId)
      }} className="w-12 h-8 bg-blue-600">StartNewRound</button>
      <h1>Hello game</h1>
      <Message />
      <Users />
      <Canvas />
      
       </div>
     
  
  )
}


