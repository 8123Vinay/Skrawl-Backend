import React, { useContext, useState } from 'react'
import { gameContext } from '../App'
export default function Users() {
    const { socket, userNames, setUserNames,roomId,setRoomId,groupMessage,setGroupMessage } = useContext(gameContext)
    let displayUsers = [];

//     // I have to display all the users in here
//   if (userNames) {
//     displayUsers = userNames.map((user, i) => {
//       return (
//         <p key={i}>{user}</p>
//       )
//     })
  
//   }


  if (socket) {
    socket.on("usersInfo", usersInfo => {
    //   setUserNames(users_backend);
    console.log(usersInfo)
    })

   
  }

  return (
    <div>
      {/* {displayUsers} */}
    </div>
  )
}
