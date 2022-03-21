const app = require("express")();
const httpServer = require("http").createServer(app);

const {GameSocket,createJoinRoom}=require("./services/game_socket");
let newSocket=new GameSocket();
// created a new gameSession and new instance of the socket
// connection for the socket connection
//now I have to add this to the given room 
newSocket.init(httpServer);
const rooms = newSocket.instance.of("/").adapter.rooms;
const sids = newSocket.instance.of("/").adapter.sids;

const map1 = new Map();

function sendUsers(id){
    let socketIds=[...rooms.get(id)]
    let userNames=[];

    for(let i=0;i<socketIds.length;i++){
        userNames.push(map1.get(socketIds[i]))
    }
    newSocket.instance.in(id).emit("players", userNames, socketIds)
    
}

// I will have to create A map
// of roomId with all the data
// 

// map1("roomId",  {socres:{user1:score, user2:score, user3:score}})
// map2("roomId", {socres:{users}, drawer,//how is next drawing})
// const roundState={
//     roomId:[],
//     players:[],
//     drawer:"",
//     socres:{user1:score, user2:score, user3:score}
// }
// if any new player joins we have to update it in the roomState as 
// well as in the roundState

// we will merge the score after each round;
// I will have to keep the count how many plaeyrs guessed correctly
// depending on that we have to decide how much socre is given to each
// player

const roomState=new map();
const {roomStateMap, playerInfoClass, SettingsClass, RoomStateClass,addNewUser,increaseScore,createRoom}=require('./state.js')



newSocket.instance.on("connection", (socket)=>{
    socket.on("join-room" ,(id,username)=>{

//    check first whehter the room exist or not



      map1.set(socket.id, username) 

      createJoinRoom(socket,id)

      sendUsers(id)      
      

    })
    
    socket.on("disconnect" ,()=>{
        console.log(sids)
    })

    socket.on("group-message", (roomId,message)=>{
        console.log(message)
        newSocket.instance.to(roomId).emit("gm", message)
       
    })
     
  


})

// the room creator has the power to start the game



httpServer.listen(4000,()=>{
    console.log("we are listening on 4000")
});


// app.get('/', (req,res)=>{
//     // let obj =new GameSocket();
//     // obj.init(server)
//     // res.send("You have connectd sucessufully");
//     // obj.value.on('connection', (socket)=>{
//     //     console.log('user connected')
    
//     //     socket.on('connect', ()=>{
//     //         obj.value.emit("message", "Hello from the server")
//     //     } )
//     // })
//     res.send('Hello Client')

//     next();
// })


// app.post('/',(res,req)=>{

// })



// server.listen(4000, ()=>{
//     console.log('we are listening on 4000')
//     console.log(server)
// })
