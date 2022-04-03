import React, { useContext, useState } from 'react'
import { gameContext } from '../App'


export default function Message() {
    const { socket,roomId} = useContext(gameContext)
    const[message,setMessage]=useState("")
    const[groupMessage,setGroupMessage]=useState([])


 
     let displayMessages=groupMessage.map((x,i)=>{
        let colour="bg-slate-300";
        if(i%2){
          colour="bg-slate-200"
        }
          return(
            <div key={i} className={`${colour}`}>
            <p className="ml-4">{x.userName}::{x.message}</p>
            </div>
          )
      })
     
    // console.log(groupMessage)



    // alternate colors

    socket.on("guessedWord", (messageArray)=>{
        let array=[];

        for(let i=Math.max(messageArray.length-10,0); i<messageArray.length;i++){
          array.push(messageArray[i]);
        }
        setGroupMessage(array);
    })
     


    
  return (
    <div className="absolute right-0 top-0 w-96 bg-slate-100 text-black h-full">
     <div className="absolute right-20 bottom-10 flex flex-wrap">
      {/* I will have to make the send message in the game area */}
      <input type="text" placeholder="type message"  value={message} onChange={(e)=>{
         setMessage(e.target.value)
       }} className="border-2 border-indigo-600 h-12" onKeyDown={(e)=>{
          if(e.keyCode==13){
            socket.emit("wordGuess", roomId, message)
            setMessage("")
          }
       }} autoFocus />
       <button onClick={()=>{
          socket.emit("wordGuess", roomId, message)
          setMessage("")
       }}className="text-white w-20 h-12 bg-blue-600 rounded-lg">Send</button>

      </div>
      {displayMessages}
    </div>
  )
}
