import React,{useState,useContext} from 'react'
import {Link} from 'react-router-dom'
import {gameContext} from '../App.js'
export default function WaitingArea() {
    const {socket,roomId,timeLimit,setTimeLimit,usersInfo, roomCreator}=useContext(gameContext);
    
    const [rounds,setRounds]=useState(1);
    console.log(usersInfo,"this is usersInfo");
    
    function displayUsers(usersInfo){
    let array=usersInfo.map((user,i)=>{
       return(
        <div className=" w-20 h-24 " key={user[0]}>  
            <img src={`https://robohash.org/${i}`} className=" w-20 h-20" alt="this is avatar" />
            <p className="text-center text-xl">{user[1].userName}{user[0]==socket.id ? "(You)" : " "}</p>
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
    for(let i=10000;i<=120000;i+=10000){
      array.push(<option value={i} key={i}>{i/1000}s</option>)
    }
    return array
}

let x=roomCreator ? false : true;
let cursor=roomCreator ? 'cursor-pointer'  :  "cursor-not-allowed"



  return (
    <div className=' w-full flex flex-col justify-start items-center  h-full gap-12 border-4 border-red-600 text-white'>
     <img src="Images/logo.png" className="w-[500px] max-h-28" />
    <div className="flex border-4 border-red-600 fine:w-[700px] w-full h-80">
     <form className={`text-center fine:w-[250px] text-white h-full ${cursor} bg-gray-400`}>
     <h1 className="text-2xl">Settings</h1>
         <p>Rounds:</p>
         <select name='rounds' className={`w-28 h-8 text-center mb-8 ${cursor} bg-gray-600`} onChange={(e)=>{
             setRounds(e.target.value)
         }} disabled= {x}>
           {roundsOptions()}
         </select>
         <p>Time Limit:</p>
         <select name='timeLimit' className={`w-28 h-8 text-center mt-8 ${cursor} bg-gray-600`} onChange={(e)=>{
            setTimeLimit(e.target.value)
         }} disabled={x}>
           {timeLimitOptions()}
         </select>
         <br/>
     <Link to="/game">
     <input type="submit" value="start" onClick={(e)=>{
       e.preventDefault()
       socket.emit('startGame', roomId, rounds, timeLimit);

     }} className={`w-16 h-8 mt-8 ${cursor} bg-blue-600 text-white rounded-lg`} disabled={x} />
     </Link>
     </form>
       <div>
     
      <div className="flex justify-start flex-wrap " >
        {displayUsers(usersInfo)}
     </div>
     </div>
     </div>
     <h1 className="text-lg p-2 bg-gray-600 mine:text-2xl">{`https://skrawlgame.netlify.app/${roomId}`}</h1>
    </div>
  )

}
// if he joins by a particular UserId we will have to add him to that room


// first I have check whether that Room Exist or not
// If any person joins the room with that id 


// place that in to the center
// I have to show You also
// for that I have to tell that 