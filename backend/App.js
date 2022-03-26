const app = require("express")();
const httpServer = require("http").createServer(app);

// I will run a timer in the frontend and 

let send=true;
// 
// I will use the App.js as a controller

const {GameSocket,createJoinRoom}=require("./services/game_socket");
let newSocket=new GameSocket();
// created a new gameSession and new instance of the socket
// connection for the socket connection
//now I have to add this to the given room 
newSocket.init(httpServer);
const rooms = newSocket.instance.of("/").adapter.rooms;
const sids = newSocket.instance.of("/").adapter.sids;

// I will have an array of objects




const Words=['king','fast','kill','mango','orange','apple','virat','delhi','mumbai',
'varanasi','haveri','hubli','mangalore','cheannai','pune','kumar','pooja','saswati'
]
// service is to create a websocket connection

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


const {startNewRound, syncRound,emit,}=require("./models/Round")
const {checkWord}=require('./logic')
const {roomStateMap,playerInfoClass, SettingsClass, RoomStateClass,joinRoom,createRoom,RoundStateClass,socketIdMap,addToSocketIdMap}=require("./services/state.js")
const {increaseScore,startGame}=require('./models/Room')

// agar start nahi hua hai to waiting area me rehan 
// hai agar start hua hai to game area me jana hai


// what ever the message comes I will route it to the controller
// and i will use the model to functions to update my room state

newSocket.instance.on("connection", (socket)=>{
  console.log('we have connected')
    socket.on("join-room" ,(roomId,userName)=>{
      createJoinRoom(socket,roomId)

        // newSocket.instance.to(socket.id).emit("startState", roomStateMap.get(roomId))
  //  anything adding data to the roomObj will be done in models
      // console.log(rooms,"This is in App.js")
    let array=Array.from(rooms.get(roomId));
    socketIdMap.set(roomId, array);
    console.log(array)
//    check first whehter the room exist or not
      if(roomStateMap.get(roomId)==undefined){
         createRoom(roomId, 2, 20000, false)
         joinRoom(roomId, socket.id, userName)
       
      }
      else{
        joinRoom(roomId, socket.id, userName)

      }
      

   
      // console.log(roomStateMap.get(roomId).roundState,"This is joining")
      newSocket.instance.to(socket.id).emit("startState", roomStateMap.get(roomId).startState)
      // newSocket.instance.to(socket.id).emit('startState', roomStateMap.get(roomId))


    //   console.log("This is RoundState", roomStateMap.get(roomId).roundState.playersMap)
      

    //   when he sends the message I have to check whether the 
    // letter is the letter that is guessed 
    // services and actions


      

    //   sendUsers(id)      
    newSocket.instance.to(roomId).emit("usersInfo", roomStateMap.get(roomId).playersMap)
    // this will send the players map we can use that 
    // console.log(roomStateMap.get(roomId).playersMap)  


    })
// run a loop for the round time for each players

    socket.on('startGame', (roomId,rounds,timeLimit)=>{
        let roomObj=roomStateMap.get(roomId)
        console.log(roomObj,"This is roomObject")
        roomObj.settings.rounds=rounds;
        roomObj.settings.timeLimit=timeLimit;
        roomObj.startState=true
        // send a word to the user
        startGame(roomObj,newSocket.instance,roomId);
        newSocket.instance.to(socket.id).emit('wordToGuess' ,'kill')
        
        
          setInterval(()=>{      
              newSocket.instance.to(roomId).emit('canvas-data', roomObj.roundState.canvasData)
              roomObj.roundState.canvasData=[];
            // I am sending the canvas data
          },2000)
        
        
    

        
        // I have emitted the start state
        // I have to send something that game has started
    })


    // when we get to start the new round I have to call a function

// I have to send the userName and the 


    
    socket.on("disconnect" ,()=>{
        console.log(sids)
    })

   
    socket.on("group-message", (roomId,message)=>{
       console.log(message,"This is guess")
       console.log( roomStateMap.get(roomId).roundState.wordToGuess,"This is the word to guess")
       if(checkWord(message, roomStateMap.get(roomId).roundState.wordToGuess)){
         increaseScore(roomStateMap,roomId, socket.id, 100)
         let playersMap=(roomStateMap.get(roomId).playersMap) 
         console.log(`${playersMap.get(socket.id).userName} guessed correctly`)
          
       }

       else{
         newSocket.instance.to(roomId).emit("gm", message) 
         console.log('wrong Guess' ,socket.id)
       }
        
       
    })


   

    socket.on('canvas-data',(roomId,drawingType, startX, startY, endX, endY)=>{
      // I have to collect the data in the fashion such a way that I will store the 
      // data and send it after 60 seconds;
      console.log(`[${startX}, ${startY}, ${endX},${endY}],`);
      let roomObj=roomStateMap.get(roomId);
      roomObj.roundState.canvasData.push([drawingType, startX, startY, endX, endY]);
      
     
     
      // console.log(roomId,drawingType, startX, startY, endX, endY)

      // add the data to the round
      //run a timer of 100ms
      // I can use set Interval and I can clear Interval 
     
      // this is the data that is to be pushed in to the canvas data
      // run a timer in the roundObj

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

