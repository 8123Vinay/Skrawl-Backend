import React ,{useState,useEffect} from 'react'
import {io} from 'socket.io-client';

export default function Input() {
  const [socket,setSocket]=useState(null);
  const [inputMessage,setInputMessage]=useState("");
  const [messageArray,setInputMessageArray]=useState([]);
  const [id,setId]=useState("")

  function displayMessages(Array){
      return(Array.map((value,i)=>{
        return (
          <p key={i}>{value}</p>
        )  
      })
    )
   }
   
  
  useEffect(()=>{
    const newSocket=io("http://localhost:4000");
    setSocket(newSocket);
  },[])

  if(socket){
    socket.on('receieve-message', (message)=>{
       setInputMessageArray([...messageArray,message])
    })

    socket.on('send-rooms', (message)=>{
      // console.log(message)
    }
      )
    }

  return (
    <div>
      <h1>Messages</h1>
      <form onSubmit={(e)=>{
              e.preventDefault()
              socket.emit('send-message', inputMessage, id);
              setInputMessage("")
              
          }}>
          <input type="text" placeholder="enter Message" id="message" value={inputMessage}onChange={(e)=>{
            setInputMessage(e.target.value)
          }}/>
          <input type="submit" value="Send" onSubmit={()=>{
              socket.emit('send-message', inputMessage)
          }}/>

          <input type="text" placeholder="enter id" id="message" value={id} onChange={(e)=>{
                setId(e.target.value)
          }}/>
          <button onClick={()=>{
             socket.emit("join-room", id)
          }}>Join Room</button>
           
      </form>     
        {displayMessages(messageArray)}
    </div>
  )
}
