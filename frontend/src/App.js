import React, { useEffect, useState, createContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { io } from 'socket.io-client';

import { Home, GameArea, WaitingArea } from './pages'
import './styles/App.css'


export const gameContext = createContext(null)

// I have to use Transition for showing the endgame Here
function displayAvatars(){
  let array=[];
      for(let i=0;i<10;i++){
        array.push(  
        <img src={`https://robohash.org/${i}`} className={` bg-slate-600`} alt="this is avatar" key={i} />)

      }
    return(
      array
   )

  }


export default function App() {
  const [roomId, setRoomId] = useState("");
  const [socket, setSocket] = useState(null);
  const [startState, setStartState] = useState(false);
  const [usersInfo, setUsersInfo] = useState([]);
  const [timeLimit, setTimeLimit] = useState(10000);
  const [roomCreator, setRoomCreater] = useState(false);
  const [home, setHome] = useState(true);
  const [guessedSet, setGuessedSet] = useState(new Set());
  const [gameEnded, setGameEnded]=useState(false);
  



  function getComponent() {
    if (home) {
      return <Home />
    }
    else {
      if (startState) {
        return <GameArea />
      }
      else {
        return <WaitingArea />
      }
    }
  }

  useEffect(() => {
    let response = io("https://skrawl.herokuapp.com");
    setSocket(response);
  }, [])

  if (socket) {

    socket.on('joinMessage',()=>{
      console.log("THis is joining message");
    })

    socket.on('joinedBefore', (startState, usersInfo) => {
      setStartState(startState);
      setUsersInfo(usersInfo);
      // joining data is needed in the waiting area
    })

    socket.on('initialData', (usersInfo, timeLimit, startState) => {
      setTimeLimit(timeLimit);
      setUsersInfo(usersInfo);
      setStartState(startState);
    })


    socket.on('roomCreator', (value) => {
      setRoomCreater(true);
    })

    socket.on('updatedScore', (usersInfoFromServer) => {
      console.log("this is updateScore=>", usersInfoFromServer);
   
        setUsersInfo(usersInfoFromServer);
      
     
        
  
     setTimeout(() => {
          setGuessedSet(new Set());
        }, 5000) 
      }
    )

    socket.on('gameEnded',(usersInfo)=>{
      setGameEnded(true);
      setUsersInfo(usersInfo);
      console.log("we have receieved GameEnded");
      setTimeout(()=>{
        setGameEnded(false);
      },10000)
    })

  }




  return (
    <div className="h-screen w-screen bg-heroPattern overflow-y-hidden" id="App" >
      <BrowserRouter>
        <gameContext.Provider value={{ socket, roomId, setRoomId, startState, setStartState, timeLimit, setTimeLimit, usersInfo, roomCreator, setHome, setUsersInfo, guessedSet, setGuessedSet,gameEnded}} >
          <Routes>
            <Route path="/" element={getComponent()} />
            <Route path="/:id" element={getComponent()} />
          </Routes>
        </gameContext.Provider>
      </BrowserRouter>
    </div>

    // <div className="grid grid-cols-4 w-full h-full  gap-20">
    //   {displayAvatars()}
    //   {/* <img src="https://robohash.org/1" className="col-start-1 col-end-4 bg-slate-600 "/> */}
    //   <p className="col-start-1 col-end-3 bg-slate-600 text-2xl">Hello</p>
    // </div>
    )
}
