import React, { useContext, useState } from 'react'
import { gameContext } from '../App'


export default function Message() {
    const { socket,roomId, guessedSet, setGuessedSet} = useContext(gameContext)
    const[message,setMessage]=useState("");
    const[groupMessageArray,setGroupMessageArray]=useState([])


 
     let displayMessages=groupMessageArray.map((x,i)=>{
        let bgColour="bg-slate-300";
        let textColor='text-black';
        if(x.message==='Guessed Correctly'){
            textColor='text-green-600'
        }
        if(i%2){
          bgColour="bg-slate-200"
        }
          return(
            <div key={i} className={`${bgColour}`}>
            <p className={`ml-4 ${textColor} font-semibold`}>{x.userName}::{x.message}</p>
            </div>
          )
      })
     




    // alternate colors

    socket.on("groupMessage", (messageObj, guessedArray)=>{

       if(groupMessageArray.length===10){
         groupMessageArray.splice(0,1);
       }
       setGroupMessageArray([...groupMessageArray, messageObj])
      
       if(messageObj.message=='Guessed Correctly'){
          setGuessedSet(new Set(guessedArray));
        
       }
     
    })
     


    
  return (
    <div className="border-4 border-slate-600 text-black min-w-[320px] h-[500px] bg-white">
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
