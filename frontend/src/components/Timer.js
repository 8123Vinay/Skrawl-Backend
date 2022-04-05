import React,{useState,useContext} from 'react'
import {gameContext} from '../App.js'
export default function Timer() {
   const {timeLimit,socket,setTimeLimit,setStartState}=useContext(gameContext);
   const [timer, setTimer]=useState(0);
    let x=setTimeout(()=>{
       setTimer(timer-1)
    },1000);


    if(timer<=0){
        clearTimeout(x);
    }

    socket.on("startTimer",(startedAt)=>{
        if(startedAt==undefined){
           setTimer(timeLimit/1000);
        }
        else{
            setTimer(parseInt((timeLimit-(Date.now()-startedAt))/1000));
        }
        
    })


  
  return (
    <div className="text-4xl absolute left-1/5 top-0 w-4/5 bg-slate-300 text-center">
        {timer}  
    </div>
  )
}
