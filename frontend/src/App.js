import React, { useEffect, useState, createContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { io } from 'socket.io-client';

import { Home, GameArea, WaitingArea } from './pages'
import './styles/App.css'


export const gameContext = createContext(null)

// I have to use Transition for showing the endgame Here



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




  // if false we have to go to waiting area else we have to go to gameplay area

  // async function run() {
  //   let httpResponse=await fetch('http://localhost:5000/',{
  //     method:"GET",
  //     headers:{'content-type': 'application/json'}
  //   })
  //   let body=await httpResponse.json();

  // }
  // run();
  useEffect(() => {
    let response = io("http://localhost:8000/");
    setSocket(response);
  }, [])

  if (socket) {

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
    <div className="h-full w-full bg-heroPattern" id="App" >
      {/* <img src="pages/Images/logo.png" className="w-2/3 h-full" /> */}
      <BrowserRouter>
        <gameContext.Provider value={{ socket, roomId, setRoomId, startState, setStartState, timeLimit, setTimeLimit, usersInfo, roomCreator, setHome, setUsersInfo, guessedSet, setGuessedSet,gameEnded}} >
          <Routes>
            <Route path="/" element={getComponent()} />
            <Route path="/:id" element={getComponent()} />
          </Routes>
        </gameContext.Provider>
      </BrowserRouter>
    </div>
  )
}
