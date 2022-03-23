import React,{useEffect,useState,createContext} from 'react'
import {BrowserRouter, Route,Routes } from 'react-router-dom'

import {io} from 'socket.io-client';

import {Home,GameArea,WaitingArea} from './pages'


export const gameContext=createContext(null)

export default function App() {
  const [roomId,setRoomId]=useState("");
  const [socket,setSocket]=useState(null);
  const [userNames,setUserNames]=useState(null)
  const [startState, setStartState]=useState(false);
  const [linkTo,setLinkTo]=useState("/waitingarea")
  // if false we have to go to waiting area else we have to go to gameplay area
  

  useEffect(()=>{
       let response=io("http://localhost:4000/")
       setSocket(response)
 },[])

 if(socket){
  socket.on('startState',(state)=>{
    if(state){
        setLinkTo('/gamearea')
     }
     
 })

}
//  console.log(`${groupMessage} This is from App component`)



  return (
    <div>
      <BrowserRouter>
       <gameContext.Provider value={{socket, userNames, setUserNames,roomId,setRoomId,startState,setStartState,linkTo,setLinkTo}} >
        <Routes>
          < Route path="/" element={<Home/>}/>
          < Route path="/gamearea" element={<GameArea/>}/>
          < Route path="/waitingarea" element={<WaitingArea />}/>
         </Routes>
       </gameContext.Provider>
       </BrowserRouter>
    </div>
  )
}
