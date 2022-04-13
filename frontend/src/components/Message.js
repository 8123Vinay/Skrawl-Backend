import React, { useContext, useState } from 'react'
import { gameContext } from '../App'


export default function Message() {
    const { socket,roomId, guessedSet, setGuessedSet} = useContext(gameContext)
    const[message,setMessage]=useState("");
    const[groupMessageArray,setGroupMessageArray]=useState([" ", " ", " ", " ", " ", " "," ", " "])


 
     let displayMessages=groupMessageArray.map((x,i)=>{
        if(x==" "){
          return(
            <div className="text-white">a</div>
          )
        }
        else{

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
        }
      })
     




    // alternate colors

    socket.on("groupMessage", (messageObj, guessedArray)=>{

       setGroupMessageArray([messageObj,...groupMessageArray])
      
       if(messageObj.message=='Guessed Correctly'){
          setGuessedSet(new Set(guessedArray));
        
       }
     
    })
     


    
  return (
    <div className="border-4 border-slate-600 text-black min-w-[280px] h-[300px] bg-white flex flex-col justify-between">
    <div className="flex flex-col-reverse overflow-y-scroll ">
      {displayMessages}
    </div>
      <input type="text" placeholder="type message"  value={message} onChange={(e)=>{
         setMessage(e.target.value)
       }} className="border-2 border-indigo-600 h-8 w-full " onKeyDown={(e)=>{
          if(e.keyCode==13){
            socket.emit("wordGuess", roomId, message)
            setMessage("")
          }
       }} autoFocus />
       {/* I want to keep the input field fixed */}
    </div>
  )
}
