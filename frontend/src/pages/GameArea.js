import React, { useContext, useState } from 'react'
import { gameContext } from '../App'
import {Canvas,Users,Message,Timer, WordPopUp,ShowScore,EndGame} from '../components'
import {useSpring,animated,useTransition} from 'react-spring'
import '../styles/GameArea.css'

export default function GameArea() {
  const { socket, roomId,setTimeLimit,setUsersInfo ,setGuessedSet,gameEnded} = useContext(gameContext)
  const [words, setWords]=useState([]);
  const [isDrawer,setIsDrawer]=useState(false);
  const [choosingWord,setChoosingWord]=useState(false);
  const [drawerUserName,setDrawerUserName]=useState('');
  const [roundScore, setRoundScore] = useState([]);
  const [wordToGuess, setWordToGuess] = useState("");
  const [round, setRound]=useState(1);
 

  const wordPopUpTransition=useTransition(choosingWord, {
     from:{x:0, y:-1000,opacity:0},
     enter:{x:0, y:0,opacity:1},
     leave:{x:1000, y:1000, opacity:0},
     delay:500
  })

  const showScoreTransition=useTransition(wordToGuess.length, {
    from:{x:0, y:-100, opacity:0},
    enter:{x:0, y:0,   opacity:1},
    leave:{x:1000, y:1000, opacity:0},
   }
  )
 
  const gameEndTransition=useTransition(gameEnded, {
    from:{x:0, y:-100, opacity:0},
    enter:{x:0, y:0,   opacity:1},
    leave:{x:1000, y:1000, opacity:0},
  })
// a prticular player is choosing the word and I have to do popUp in there 

socket.on('setDrawer', (wordArray,drawerId,drawerUserName,round)=>
  {
   
     if(socket.id===drawerId){
       setIsDrawer(true);
       setWords(wordArray);
    }
     setChoosingWord(true);
     setDrawerUserName(drawerUserName);
     setRound(round);
})

socket.on('startRound', (timeLimit)=>{
   setChoosingWord(false);

})

socket.on('removeDrawer',(word)=>{

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
socket.on('roundScore', (roundInfo, actualWord)=>{
   console.log("this is roundScore=>", roundInfo);
   setRoundScore(roundInfo);
   setWordToGuess(actualWord);
 

   setTimeout(()=>{
     setWordToGuess("");
     setRoundScore([]);
     setGuessedSet(new Set());
   },7000)
})



  return (
    <div className="w-full flex flex-col items-center h-80" >
    <img src="Images/logo.png" className="w-[350px] max-h-24" />
    {wordPopUpTransition((style,item)=>{
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
     })
    }
    {/* <animated.WordPopUp words={words} socket= {socket} roomId={roomId} setWords={setWords} choosingWord={choosingWord} drawerId={drawerUserName} /> */}
      
      <Timer round={round}/>
      <div className="flex justify-end md:justify-center">
        <Users />
        <Canvas isDrawer={isDrawer} />
        <Message />
    
      </div>
      
      {showScoreTransition((style,item)=>{
        if(item){
         return(
           <animated.div style={style} >
              <ShowScore  roundScore={roundScore}/>
           </animated.div>
        )
      }
      else{
        return ""
      }
    })}
     
     {
       gameEndTransition((style ,item)=>{
         if(item){
           return(
             <animated.div style={style} >
                <EndGame />
             </animated.div>
           )
         }
       })
     }
    </div>
  )
}


