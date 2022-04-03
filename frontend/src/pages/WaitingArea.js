import React,{useState,useContext} from 'react'
import {Link} from 'react-router-dom'
import {gameContext} from '../App.js'
export default function WaitingArea() {
    const {socket,roomId,timeLimit,setTimeLimit}=useContext(gameContext);
    
    const [rounds,setRounds]=useState(2);

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

// I will have to get this information from the server
// this information has to sent only once by the user
// generate link how do I do that
// I will take the url and if that url contains 
// If start is true i will render gameArea


  return (
    <div className="w-60 bg-blue-200 h-80">
     <form className='text-center'>
         <p>Rounds:</p>
         <select name='rounds' className="w-28 h-8 text-center mb-8" onChange={(e)=>{
             setRounds(e.target.value)
         }}>
           {roundsOptions()}
         </select>
         <p>Time Limit:</p>
         <select name='timeLimit' className="w-28 h-8 text-center mt-8" onChange={(e)=>{
            setTimeLimit(e.target.value)
         }}>
           {timeLimitOptions()}
         </select>
         <br/>
     <Link to="/game">
     <input type="submit" value="start" onClick={(e)=>{
       e.preventDefault()
       console.log("Hello clicked")
       socket.emit('startGame', roomId, rounds, timeLimit);

     }} className="w-16 h-8 mt-8 cursor-pointer bg-blue-600 text-white rounded-lg"/>
     </Link>
     </form>
     
     {/* in room I should have another state where it will indicate
     whether game is started or not if yes then other player shoulds  */}
     <p></p>

    </div>
  )
}
