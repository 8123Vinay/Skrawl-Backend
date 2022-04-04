import React, { useContext, useState, useEffect } from 'react'
import { gameContext } from '../App'
import { useParams } from 'react-router-dom';




export default function Home() {

  const { socket,roomId,setRoomId,setHome} = useContext(gameContext)
  const [userName, setUserName] = useState("");

  const {id}=useParams();
  
  
  function randomString(){
    let letters=[];
    for(let i=65;i<90;i++){
      letters.push(String.fromCharCode(i))
    }
    for(let i=97;i<122;i++){
      letters.push(String.fromCharCode(i))
    }
    for(let i=0;i<10;i++){
      letters.push(i);
    }
    // I have got all the letters now 
  
    // I have to generate a random string from the array of letters
    let size=letters.length;
    let string="";
    for(let i=0;i<10;i++){
      string+=letters[Math.floor(Math.random()*size)]
    }
    console.log('we are runing the random string funtions')
    setRoomId(string);
   
  }

  useEffect(()=>{
    if(socket){
      socket.emit("join-room", roomId, userName)
      setUserName("");
     }
    
  },[roomId]) 

 
  return (
    <div className="relative top-60 left-80">
      <input type="text" placeholder="username" value={userName} onChange={(e) => {
        setUserName(e.target.value)
      }} className="border-2 border-indigo-600" />
     

      <button className="text-white w-40 bg-blue-600 rounded-lg" onClick={() => {
        randomString();
        setTimeout(()=>{
          setHome(false)
        },1000)
        
      }}>Create Private Room</button>

      <button className="text-white w-40 bg-blue-600 rounded-lg" onClick={() => {
        setRoomId(id);
        setTimeout(()=>{
          setHome(false)
        },1000)
      }}>Play</button>
      
    </div>
  )
}

// let me have a case where anyone can start the game if there are
// more than 2 players are there in the waiting area
// and players are allowed to join even after the round has started



// I can load the things conditionally if 