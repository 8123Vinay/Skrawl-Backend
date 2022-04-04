import React,{useState,useContext} from 'react'
import {Link} from 'react-router-dom'
import {gameContext} from '../App.js'
export default function WaitingArea() {
    const {socket,roomId,timeLimit,setTimeLimit,usersInfo, roomCreator}=useContext(gameContext);
    
    const [rounds,setRounds]=useState(2);

    function displayUsers(usersInfo){
    let array=usersInfo.map((user,i)=>{
       return(
        <div className="w-32 h-40 ">  
            <img src={`https://robohash.org/${i}`} className={` w-32 h-32  `} alt="this is avatar"/>
            <p className="text-center">{user[1].userName}{user[0]==socket.id ? "(You)" : " "}</p>
        </div>
      )

     }
    
    )
    return array;
  }

function roundsOptions(){
    let array=[]
    for(let i=1;i<=10;i++){
      array.push(<option value={i} key={i} >{i}</option>)
    }
    return array
}

function timeLimitOptions(){
    let array=[]
    for(let i=20000;i<=120000;i+=10000){
      array.push(<option value={i} key={i}>{i/1000}s</option>)
    }
    return array
}

let x=roomCreator ? false : true;
let cursor=roomCreator ? 'cursor-pointer'  :  "cursor-not-allowed"
console.log(x,"This is checking room Creator")


  return (
    <div className={`absolute left-[200px] top-40 right-[200px] bg-gray-300 h-2/3 `}>
     <form className={`text-center w-1/3 bg-blue-200 h-full ${cursor}`}>
     <h1 className="text-2xl">Settings</h1>
         <p>Rounds:</p>
         <select name='rounds' className={`w-28 h-8 text-center mb-8 ${cursor}`} onChange={(e)=>{
             setRounds(e.target.value)
         }} disabled= {x}>
           {roundsOptions()}
         </select>
         <p>Time Limit:</p>
         <select name='timeLimit' className={`w-28 h-8 text-center mt-8 ${cursor}`} onChange={(e)=>{
            setTimeLimit(e.target.value)
         }} disabled={x}>
           {timeLimitOptions()}
         </select>
         <br/>
     <Link to="/game">
     <input type="submit" value="start" onClick={(e)=>{
       e.preventDefault()
       console.log("Hello clicked")
       socket.emit('startGame', roomId, rounds, timeLimit);

     }} className={`w-16 h-8 mt-8 ${cursor} bg-blue-600 text-white rounded-lg`} disabled={x} />
     </Link>
     </form>
     <div className="absolute top-0 left-1/3 w-2/3">
      <h1 className="text-3xl text-center">Players</h1>
     <div className="flex justify-center flex-wrap " >
        {displayUsers(usersInfo)}
     </div>
     </div>
     <h1 className="text-2xl p-2 bg-gray-600">{`http://localhost:3000/${roomId}`}</h1>
    </div>
  )

}
// if he joins by a particular UserId we will have to add him to that room


// first I have check whether that Room Exist or not
// If any person joins the room with that id 


// place that in to the center
// I have to show You also
// for that I have to tell that 