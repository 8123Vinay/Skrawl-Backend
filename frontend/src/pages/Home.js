import React, { useContext, useState, useEffect } from 'react'
import { gameContext } from '../App'
import { useParams } from 'react-router-dom';





export default function Home() {

  const { socket,roomId,setRoomId,setHome} = useContext(gameContext)
  const [userName, setUserName] = useState("");

  const {id}=useParams();
  function displayAvatars(){
    let array=[];
        for(let i=0;i<7;i++){
          array.push(  
          <img src={`https://robohash.org/${i}`} className={` w-20 h-20  `} alt="this is avatar"/>
                    )

        }
      return(
        array
     )

    }
  
  

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
    <div className="flex flex-col items-center justify-start h-full top-12 left-0 w-full border-8 border-slate-500 gap-2">
      <img src="Images/logo.png" className="w-[400px]" />
     <div className="flex justify-center flex-wrap w-full  ">
       {displayAvatars()}
     </div>
     <div className="mt-12 flex flex-wrap w-[300px] relative h-1/3 border-4 border-slate-500 rounded-xl ">
      <input type="text" placeholder="username" value={userName} onChange={(e) => {
        setUserName(e.target.value)
      }} className="border-2 pl-2 border-slate-600 w-full h-12  m-4 rounded-xl" />
     

      <button className="text-white bg-blue-600 rounded-lg w-full h-12 m-4" onClick={() => {
        randomString();
        setTimeout(()=>{
          setHome(false)
        },1000)
        
      }}>Create Private Room</button>

      <button className="text-white bg-green-600 rounded-lg  w-full h-12 m-4" onClick={() => {
        setRoomId(id);
        setTimeout(()=>{
          setHome(false)
        },1000)
      }}>Play</button>
      
    </div>
    </div>

  )
}

// let me have a case where anyone can start the game if there are
// more than 2 players are there in the waiting area
// and players are allowed to join even after the round has started



// I can load the things conditionally if 