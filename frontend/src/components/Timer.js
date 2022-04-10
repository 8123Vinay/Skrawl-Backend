import React,{useState,useContext} from 'react'
import {gameContext} from '../App.js'
export default function Timer(props) {
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
    <div className="text-4xl w-full bg-slate-600 pl-4 flex gap-12">
      <p>{timer}</p>
      <p>Round: {props.round}</p>  
    </div>
  )
}
