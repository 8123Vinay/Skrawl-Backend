import React, { useContext, useState } from 'react'
import { gameContext } from '../App'


export default function Message() {
    const { socket, userNames, setUserNames,roomId,setRoomId} = useContext(gameContext)
    const[message,setMessage]=useState("")
    const[groupMessage,setGroupMessage]=useState([])

    let displayMessages=groupMessage.map((message,i)=>{
        return(
          <p key={i}>{message}</p>
        )
    })
// controller is there to handle anything that is coming from
//the Client;

   

    socket.on("gm", (message)=>{
      setGroupMessage([...groupMessage, message])
    })

    
  return (
    <div className="absolute right-0 top-0 w-96 bg-green-600 text-black h-full">
    <div className="absolute right-20 bottom-10 flex flex-wrap">
      {/* I will have to make the send message in the game area */}
      <input type="text" placeholder="type message"  value={message} onChange={(e)=>{
         setMessage(e.target.value)
       }} className="border-2 border-indigo-600 "/>
       <button onClick={()=>{
          socket.emit("group-message", roomId, message)
          console.log(message)
          setMessage("")
       }}className="text-white w-20 h-8 bg-blue-600 rounded-lg">Send</button>

      </div>
      {displayMessages}
    </div>
  )
}
