const app = require("express")();
const httpServer = require("http").createServer(app);

// I will run a timer in the frontend and 



const {GameSocket,createJoinRoom}=require("./services/game_socket");
let newSocket=new GameSocket();
// created a new gameSession and new instance of the socket
// connection for the socket connection
//now I have to add this to the given room 
newSocket.init(httpServer);
const rooms = newSocket.instance.of("/").adapter.rooms;
const sids = newSocket.instance.of("/").adapter.sids;

const Words=['king','fast','kill','mango','orange','apple','virat','delhi','mumbai',
'varanasi','haveri','hubli','mangalore','cheannai','pune','kumar','pooja','saswati'
]

// when I start round I have to make all the scores 
//in the round to be zero each time

// I have to first display the round end someHow


// I will have to choose a random word and add to the round state
//each time the word that is to be guessed

// function sendUsers(id){
//     let socketIds=[...rooms.get(id)]
//     let userNames=[];

//     for(let i=0;i<socketIds.length;i++){
//         userNames.push(map1.get(socketIds[i]))
//     }
//     newSocket.instance.in(id).emit("players", userNames, socketIds)
    
// }

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


const {startNewRound, syncRound}=require("./Actions/Round.js")
const {checkWord}=require('./logic')
const {roomStateMap,playerInfoClass, SettingsClass, RoomStateClass,joinRoom,createRoom,RoundStateClass}=require("./services/state.js")
const {increaseScore}=require('./Actions/Room.js')

// agar start nahi hua hai to waiting area me rehan 
// hai agar start hua hai to game area me jana hai



newSocket.instance.on("connection", (socket)=>{
    socket.on("join-room" ,(roomId,userName)=>{
        newSocket.instance.to(socket.id).emit("startState", roomStateMap.get(roomId))
    

//    check first whehter the room exist or not
      if(roomStateMap.get(roomId)==undefined){
        //   roomId, rounds, timeLimit,startState
         createRoom(roomId, 2, 4000, false)
         joinRoom(roomId, socket.id, userName)
       
      }
      else{
        joinRoom(roomId, socket.id, userName)

      }
      console.log(roomStateMap.get(roomId).roundState,"This is joining")
      
      newSocket.instance.to(socket.id).emit('startState', roomStateMap.get(roomId).startState)


    //   console.log("This is RoundState", roomStateMap.get(roomId).roundState.playersMap)
      

    //   when he sends the message I have to check whether the 
    // letter is the letter that is guessed 
    // services and actions


      createJoinRoom(socket,roomId)

    //   sendUsers(id)      
    newSocket.instance.to(roomId).emit("usersInfo", roomStateMap.get(roomId).playersMap)
    // this will send the players map we can use that 
    console.log(roomStateMap.get(roomId).playersMap)  


    })

    socket.on('startGame', (roomId,rounds,timeLimit)=>{
        let roomObj=roomStateMap.get(roomId)
        roomObj.startState=true
        roomObj.settings.rounds=rounds;
        roomObj.settings.timeLimit=timeLimit;
    })

    // when we get to start the new round I have to call a function


    socket.on('startNewRound', (roomId)=>{
        let roomObj=roomStateMap.get(roomId);

        startNewRound(roomObj.roundState.playersMap);
        setTimeout(()=>{
          syncRound(roomObj.playersMap, roomObj.roundState.playersMap)
          newSocket.instance.to(roomId).emit('end-round' , "Round Ended")
        },roomObj.settings.timeLimit)
    })




    
    socket.on("disconnect" ,()=>{
        console.log(sids)
    })

   
    socket.on("group-message", (roomId,message)=>{
      

       if( checkWord(message)){
         increaseScore(roomStateMap,roomId, socket.id, 100)
         let playersMap=(roomStateMap.get(roomId).playersMap) 
         console.log(`${playersMap.get(socket.id).userName} guessed correctly`) 
       }
       else{

         newSocket.instance.to(roomId).emit("gm", message) 
         console.log('wrong Guess' ,socket.id)
       }
        
       
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

