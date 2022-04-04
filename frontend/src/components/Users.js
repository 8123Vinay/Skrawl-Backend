import React, { useContext, useState, useEffect } from 'react'
import { gameContext } from '../App'
export default function Users() {
    const { socket,usersInfo } = useContext(gameContext)
    

   function displayUsers(usersInfo){
      usersInfo.sort((a,b)=>{
        return ((b[1].score-a[1].score))
      })

    let array=usersInfo.map((user,i)=>{
      let colour="bg-slate-300";
      if(i%2){
        colour="bg-slate-200"
      }
       return(
         <div key={i} className={`${colour} h-16`}>
            <img src={`https://robohash.org/${i}`} className={` w-16 h-16 right-0 absolute`}/>
            <p className="text-center ">#{i+1}  {user[1].userName}{user[0]==socket.id ? "(You)" : " "}</p>
            <p className="text-center ">Score:{user[1].score}</p>
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
    <div className="w-60 bg-slate-100 absolute">
       {displayUsers(usersInfo)}
    </div>
  )
 }

 
 else{
   return(
     <div className="w-60 bg-slate-100">
     </div>
   )
 }
  
}
