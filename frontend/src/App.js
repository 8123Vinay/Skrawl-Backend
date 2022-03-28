import React,{useEffect,useState,createContext} from 'react'
import {BrowserRouter, Route,Routes } from 'react-router-dom'

import {io} from 'socket.io-client';

import {Home,GameArea,WaitingArea} from './pages'



export const gameContext=createContext(null)

export default function App() {
  const [roomId,setRoomId]=useState("");
  const [socket,setSocket]=useState(null);
  const [startState, setStartState]=useState(true);

  
  // if false we have to go to waiting area else we have to go to gameplay area
  

  useEffect(()=>{
       let response=io("http://localhost:4000/")
       setSocket(response)
 },[])

 if(socket){
  socket.on('startState',(state)=>{
        setStartState(state)
        // console.log(state,"state Message")
 }


 )




}
//  console.log(`${groupMessage} This is from App component`)



  return (
    <div>
      <BrowserRouter>
       <gameContext.Provider value={{socket,roomId,setRoomId,startState,setStartState,}} >
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
