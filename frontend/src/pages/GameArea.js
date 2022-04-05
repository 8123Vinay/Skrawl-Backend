import React, { useContext, useState } from 'react'
import { gameContext } from '../App'
import {Canvas,Users,Message,Timer, WordPopUp} from '../components'
export default function GameArea() {
  const { socket, roomId,setTimeLimit,setUsersInfo } = useContext(gameContext)
  const [words, setWords]=useState([]);
  const [isDrawer,setIsDrawer]=useState(false);
  const [choosingWord,setChoosingWord]=useState(false);
  const [drawerUserName,setDrawerUserName]=useState('');
 
// a prticular player is choosing the word and I have to do popUp in there 

socket.on('setDrawer', (wordArray,drawerId,drawerUserName)=>
  {
 
    console.log('we have setDrawer message')
     if(socket.id===drawerId){
       setIsDrawer(true);
       setWords(wordArray);
    }
     setChoosingWord(true);
     setDrawerUserName(drawerUserName);
})

socket.on('startRound', (timeLimit)=>{
   setChoosingWord(false);

})

socket.on('removeDrawer',(word)=>{
  console.log('we have got remove drawer')
  setIsDrawer(false);
})

socket.on("joinedWhileChoosingWord",(drawerUserName,timeLimit, usersInfo)=>{
  setDrawerUserName(drawerUserName);
  setTimeLimit(timeLimit);
  setUsersInfo(usersInfo);
  
  // I need to get when should I 
})

socket.on('joinedInBetween', (timeLimit)=>{
  setTimeLimit(timeLimit);
})


  return (
    <div className="h-full w-full" >
    <WordPopUp words={words} socket= {socket} roomId={roomId} setWords={setWords} choosingWord={choosingWord} drawerId={drawerUserName} />
      <Timer />
      <Message />
      <Users />
      <Canvas isDrawer={isDrawer} />
    </div>
  )
}


