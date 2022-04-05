import React,{useEffect,useState,createContext} from 'react'
import {BrowserRouter, Route,Routes } from 'react-router-dom'

import {io} from 'socket.io-client';

import {Home,GameArea,WaitingArea} from './pages'


export const gameContext=createContext(null)

export default function App() {
  const [roomId,setRoomId]=useState("");
  const [socket,setSocket]=useState(null);
  const [startState, setStartState]=useState(false);
  const [usersInfo, setUsersInfo]=useState([]);
  const [timeLimit,setTimeLimit]=useState(20000);
  const [roomCreator,setRoomCreater]=useState(false);
  const [home,setHome]=useState(true);
  // if true he will be in home page else He will be either in the game area or 
  // in the 

  function getComponent(){
    if(home){
      return <Home />
    }
    else{
      if(startState){
        return <GameArea />
      }
      else{
        return <WaitingArea />
      }
    }
  }
  


  
  // if false we have to go to waiting area else we have to go to gameplay area
  
  // async function run() {
  //   let httpResponse=await fetch('http://localhost:5000/',{
  //     method:"GET",
  //     headers:{'content-type': 'application/json'}
  //   })
  //   let body=await httpResponse.json();
  //   console.log(body); 
  // }
  // run();
  useEffect(()=>{
       let response=io("http://localhost:5000/");
       setSocket(response);
 },[])

 if(socket){
  socket.on('joinBefore', (startState,usersInfo)=>{
    setStartState(startState);
    setUsersInfo(usersInfo);
// joining data is needed in the waiting area
})

socket.on('initialData', (usersInfo,timeLimit,startState)=>{
  setTimeLimit(timeLimit);
  setUsersInfo(usersInfo);
  setStartState(startState);
})


socket.on('roomCreator', (value)=>{
  setRoomCreater(true);
})

socket.on('updatedScore', (usersInfo)=>{
  setUsersInfo(usersInfo);
})

}




  return (
    <div className="h-full w-full z--1">
      <BrowserRouter>
       <gameContext.Provider value={{socket,roomId,setRoomId,startState,setStartState,timeLimit,setTimeLimit,usersInfo,roomCreator,setHome}} >
        <Routes>
          <Route path="/" element={getComponent()} />
          <Route path="/:id" element={getComponent()} />
         </Routes>
       </gameContext.Provider>
       </BrowserRouter>
    </div>
  )
}
