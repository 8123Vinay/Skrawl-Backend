import React, { useContext, useState } from 'react'
import { gameContext } from '../App'
import {Canvas,Users,Message,Timer, WordPopUp} from '../components'
export default function GameArea() {
  const { socket, roomId, } = useContext(gameContext)
  const [words, setWords]=useState([]);
  const [isDrawer,setIsDrawer]=useState(false);
 
// a prticular player is choosing the word and I have to do popUp in there 

  socket.on('setDrawer',(wordArray)=>
  {
      setIsDrawer(true);
      setWords(wordArray);
      setTimeout(()=>{
         setWords([]);
      },5000)
      

 })

  return (
    <div className="h-full w-full" >
    <WordPopUp words={words} socket= {socket} roomId={roomId} setWords={setWords } />
      <Timer />
      <Message />
      <Users />
      <Canvas isDrawer={isDrawer} setIsDrawer={setIsDrawer}/>
    </div>
  )
}


