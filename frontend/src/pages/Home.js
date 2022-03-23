import React, { useContext, useState } from 'react'
import { gameContext } from '../App'
import { Link } from 'react-router-dom'

export default function Home() {

  const { socket, response, setResponse, roomId, setRoomId,linkTo,setLinkTo} = useContext(gameContext)
  const [userName, setUserName] = useState("");




 
  return (
    <div className="relative top-60 left-80">
      <input type="text" placeholder="username" value={userName} onChange={(e) => {
        setUserName(e.target.value)
      }} className="border-2 border-indigo-600" />
      <input type="text" placeholder="room id" value={roomId} onChange={(e) => {
        setRoomId(e.target.value)
      }} className="border-2 border-indigo-600" />
      <Link to={linkTo}><button className="text-white w-40 bg-blue-600 rounded-lg" onClick={() => {
        socket.emit("join-room", roomId, userName)
        setUserName("")
      }}>Create Room</button></Link>
      <Link to={linkTo}><button className="text-white w-40 bg-blue-600 rounded-lg" onClick={() => {
        socket.emit("join-room", roomId, userName)
        setRoomId("")
        setUserName("")
      }}>Join Room</button>
      </Link>
    </div>
  )
}

// let me have a case where anyone can start the game if there are
// more than 2 players are there in the waiting area
// and players are allowed to join even after the round has started


