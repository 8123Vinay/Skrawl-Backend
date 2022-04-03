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


  
  // if false we have to go to waiting area else we have to go to gameplay area

  useEffect(()=>{
       let response=io("http://localhost:5000/")
       console.log(response);
       setSocket(response)
 },[])

 if(socket){
  socket.on('startState',(state)=>{
        setStartState(state)
        console.log('we have received start state=>',state);
       
 })




socket.on('dataForGame', (usersInfo,timeLimit)=>{
  setTimeLimit(timeLimit);
  setUsersInfo(usersInfo);
  console.log(usersInfo);

})


}




  return (
    <div className="h-full w-full z--1">
      <BrowserRouter>
       <gameContext.Provider value={{socket,roomId,setRoomId,startState,setStartState,timeLimit,setTimeLimit,usersInfo}} >
        <Routes>
          {/* < Route path="/" element={<Canvas/>}/> */}
          <Route path="/game" element={startState ? <GameArea /> :<WaitingArea /> } />
          <Route path="/" element={<Home />} />
         </Routes>
       </gameContext.Provider>
       </BrowserRouter>
    </div>
  )
}
