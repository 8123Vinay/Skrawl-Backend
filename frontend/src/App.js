import React,{useEffect,useState,createContext} from 'react'
import {Home,GameArea} from './pages'
import {io} from 'socket.io-client';
import {BrowserRouter, Route,Routes } from 'react-router-dom'

export const gameContext=createContext(null)

export default function App() {
  const [roomId,setRoomId]=useState("");
  const [socket,setSocket]=useState(null);
  const [userNames,setUserNames]=useState(null)
  

  useEffect(()=>{
       let response=io("http://localhost:4000/")
       setSocket(response)
 },[])


//  console.log(`${groupMessage} This is from App component`)



  return (
    <div>
      <BrowserRouter>
       <gameContext.Provider value={{socket, userNames, setUserNames,roomId,setRoomId}} >
        <Routes>
          < Route path="/" element={<Home/>}/>
          < Route path="/gamearea" element={<GameArea/>}/>
         </Routes>
       </gameContext.Provider>
       </BrowserRouter>
    </div>
  )
}
