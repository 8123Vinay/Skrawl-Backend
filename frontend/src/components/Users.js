import React, { useContext, useState, useEffect } from 'react'
import { gameContext } from '../App'
export default function Users() {
    const { socket } = useContext(gameContext)
    const [usersInfo, setUsersInfo]=useState([]);
    const baseUrl=`https://robohash.org/`

    let array=[]; 
    socket.on("usersInfo", usersInfo => {
      console.log(usersInfo,"This is from users page")
      // setUsersInfo(usersInfo);
  
      array=usersInfo.map((user,i)=>{
         return(
           <div key={i}>
              <img src={`https://robohash.org/${i}`} className="w-12 h-12" />
             <p>{user.userName}:: {user.score}</p>
           </div>
        )
       }
      )
      setUsersInfo(array);
     }
 
    )


 if(usersInfo.length){
  return (
    <div>
      <p>Hello this is usersInfo</p>
       {usersInfo}
    </div>
  )
 }

 
 else{
   return(
     <div>
       <h1>Hello users</h1>
     </div>
   )
 }
  
}
