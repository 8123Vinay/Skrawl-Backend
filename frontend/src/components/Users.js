import React, { useContext, useState, useEffect } from 'react'
import { gameContext } from '../App'
export default function Users() {
    const { socket,usersInfo, guessedSet } = useContext(gameContext)

    
   function displayUsers(usersInfo){

    let array=usersInfo.map((user,i)=>{
      let bgColour="bg-slate-300";

      if(i%2){
        bgColour="bg-slate-200"
      }

      if(guessedSet.has(user[0])){
        bgColour="bg-green-400"
        if(i%2){
          bgColour="bg-green-600"
        }
      }
     

       return(
         <div key={user[0]} className={`${bgColour} h-16 flex justify-between`}>  
            { user[1].rank ? <p className="text-2xl pl-4">#{i+1}</p>: 0}
            <div className="flex-flex-col items-center">
              <p className="text-xl">{user[1].userName}</p>
              <p className="text-xl">Score:{user[1].score}</p>
            </div>
           
            <img src={`https://robohash.org/${i}`} className={` w-16 h-16 `} alt='this is avatar'/>
         </div>
      )

     }
    
    )
    return array;
  }

   

    // socket.on('playerDisconnected',(userName)=>{
    //     let array=usersInfo.filter((user)=>{
    //       return user[1].userName!=userName;
    //     })
    //     setUsersInfo(array);
    // }) 


 if(usersInfo.length){
  return (
    <div className="bg-slate-100 w-80">
       {displayUsers(usersInfo)}
    </div>
  )
 }

 
 else{
   return(
     <div className=" bg-slate-100">
     </div>
   )
 }
  
}
