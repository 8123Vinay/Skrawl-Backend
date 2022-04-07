import React, { useContext, useState } from 'react'
import { gameContext } from '../App'
import {Canvas,Users,Message,Timer, WordPopUp} from '../components'
import {useSpring,animated,useTransition} from 'react-spring'
import '../styles/GameArea.css'
export default function GameArea() {
  const { socket, roomId,setTimeLimit,setUsersInfo } = useContext(gameContext)
  const [words, setWords]=useState([]);
  const [isDrawer,setIsDrawer]=useState(false);
  const [choosingWord,setChoosingWord]=useState(false);
  const [drawerUserName,setDrawerUserName]=useState('');
 

  const transition=useTransition(choosingWord, {
     from:{x:0, y:-1000,opacity:0},
     enter:{x:0, y:0,opacity:1},
     leave:{x:1000, y:1000, opacity:0},
     delay:500
  })
 
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
    <div className="w-full flex flex-col items-center h-80" >
    <img src="Images/logo.png" className="w-[350px] max-h-24" />
    {transition((style,item)=>{
      if(item){
         return(
           <animated.div style={style}>
              {/* <WordPopUp  words={words} socket= {socket} roomId={roomId} setWords={setWords} choosingWord={choosingWord} drawerId={drawerUserName} /> */}
           </animated.div>
        )
      }
      else{
        return ""
      }
    })}
    {/* <animated.WordPopUp words={words} socket= {socket} roomId={roomId} setWords={setWords} choosingWord={choosingWord} drawerId={drawerUserName} /> */}
     
      <Timer />
      <div className="flex justify-end md:justify-center">
        <Users />
        <Canvas isDrawer={isDrawer} />
        <Message />
    
      </div>
      
      
    </div>
  )
}


