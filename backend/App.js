const app = require("express")();
const httpServer = require("http").createServer(app);

const PORT = process.env.PORT || 8000;

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin" ,"https://skrawl.herokuapp.com/")
  res.setHeader("Access-Control-Allow-Methods","GET");
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
})

app.get("/", (req,res)=>{
 
  res.json("Hello user How are you this is checking the get request")
})

const { GameSocket, createJoinRoom } = require("./services/game_socket");
let newSocket = new GameSocket();
// created a new gameSession and new instance of the socket
// connection for the socket connection
//now I have to add this to the given room 
newSocket.init(httpServer);
const rooms = newSocket.instance.of("/").adapter.rooms;
const sids = newSocket.instance.of("/").adapter.sids;




const { startNewRound, handleMessage, wordChosen,startGameTimeOut,endGameTimeOut } = require("./models/Round")
const { roomStateMap, joinRoom, createRoom, socketIdMap, } = require("./services/state.js")
const { startGame } = require('./models/Room')

const socketRoomMap=new Map;

// socket=>roomId;
// agar start nahi hua hai to waiting area me rehan 
// hai agar start hua hai to game area me jana hai


// what ever the message comes I will route it to the controller
// and i will use the model to functions to update my room state

newSocket.instance.on("connection", (socket) => {

  socket.on("join-room", (roomId, userName) => {
    

    // check the start state and then only update the
    // userInfo state

    // check the status of the room
    
    createJoinRoom(socket, roomId)
        // this is to the socket.io joining room
    socketRoomMap.set(socket.id, roomId);

    
  
    // console.log(array)
    //    check first whehter the room exist or not
    if (roomStateMap.get(roomId) == undefined) {
      createRoom(roomId, 2, 30000, false)
      joinRoom(roomId, socket.id, userName)

    }

    else {
      joinRoom(roomId, socket.id, userName)

    }

    

    // console.log(roomStateMap.get(roomId).roundState,"This is joining")
    let roomObj=roomStateMap.get(roomId);
    if(!(roomStateMap.get(roomId).startState)){
      newSocket.instance.to(roomId).emit("joinedBefore",false, [...roomObj.playersMap]);
      // added to the socketIdMap array 
      let array = Array.from(rooms.get(roomId));
      socketIdMap.set(roomId, array);
    }
    
    else{
      roomObj.joinedInBetween.push(socket.id);

      newSocket.instance.to(roomId).emit("joinedBefore", true, [...roomObj.playersMap]);
      let drawerId=roomObj.roundState.drawerId;
      let drawerUserName=roomObj.playersMap.get(drawerId).userName;
      if(roomObj.roundState.choosingWord){
        setTimeout(()=>{
          newSocket.instance.to(socket.id).emit("joinedWhileChoosingWord", drawerUserName, roomObj.settings.timeLimit, [...roomObj.playersMap])
        },500)
       
      }
      else{
        setTimeout(()=>{
          newSocket.instance.to(socket.id).emit('canvas-data',roomObj.roundState.roundCanvasData);
          newSocket.instance.to(socket.id).emit("joinedInBetween", roomObj.settings.timeLimit);

          setTimeout(()=>{
            newSocket.instance.to(socket.id).emit('startTimer', roomObj.roundState.startedAt)
          },1000)
        },1000)
        

      }
}
   
    
    if(roomObj.playersMap.size==1){
       newSocket.instance.to(socket.id).emit('roomCreator',"one")
    }

})

socket.on('startGame', (roomId, rounds, timeLimit) => {
    let roomObj = roomStateMap.get(roomId)

    roomObj.settings.rounds = rounds;
    roomObj.settings.timeLimit = timeLimit;
    console.log(timeLimit,"This is time limit");
    roomObj.startState = true
    // send a word to the user
    startGame(roomObj, newSocket.instance, roomId);


})



  socket.on("wordGuess", (roomId, message) => {
    let roomObj = roomStateMap.get(roomId)
   
    handleMessage(message, roomObj, socket.id, roomId, newSocket.instance);

  })




  socket.on('canvas-data', (roomId, drawingType, startX, startY, endX, endY,canvasSize) => {
    // I have to collect the data in the fashion such a way that I will store the 
    // data and send it after 60 seconds;
    let roomObj = roomStateMap.get(roomId);
    roomObj.roundState.lastCanvasData.push([drawingType, startX, startY, endX, endY,canvasSize]);
    roomObj.roundState.roundCanvasData.push([drawingType, startX, startY, endX, endY,canvasSize]);
  
   



   

    // add the data to the round
    //run a timer of 100ms
    // I can use set Interval and I can clear Interval 

    // this is the data that is to be pushed in to the canvas data
    // run a timer in the roundObj

  })



socket.on('chosenWord', (word, roomId) => {

    let roomObj = roomStateMap.get(roomId)
    startNewRound(roomObj, roomId, newSocket.instance);
    roomObj.roundState.wordToGuess=word;
    wordChosen(word,roomObj,newSocket.instance,roomId)
 
  })


  socket.on("disconnect", () => {
   
    
    let roomId=socketRoomMap.get(socket.id);
    let roomObj=roomStateMap.get(roomId);
    socketRoomMap.delete(socket.id);
    // I have to delete it in the playersMap and as well as In the roundplayersmap
      

    let userName=roomObj.playersMap.get(socket.id).userName;
    newSocket.instance.to(roomId).emit('groupMessage',({userName:userName, message:'leftSpace',socketId:socket.id}));
    
    
    roomObj.playersMap.delete(socket.id);

    roomObj.roundState.playersMap.delete(socket.id);

    if(roomObj.playersMap.size==1){
      clearTimeout(startGameTimeOut);
      clearTimeout(endGameTimeOut);
      newSocket.instance.to(roomId).emit('gameEnded', [...roomObj.playersMap]);
      return;
    }


    newSocket.instance.to(roomId).emit('updatedScore', [...roomObj.playersMap]);

    // now after sending the score we have to update the backend


    // get the index of the socketIdMap
    let array=socketIdMap.get(roomId);
    let index=array.indexOf(socket.id);
    // this is the index of the disconnected player in the socketIdMap
    let turnCount=roomObj.roundState.turnCount;
    
    socketIdMap.get(roomId).slice(index,1); 

    if(index!=-1){
      if(index<turnCount){
         roomObj.roundState.turnCount--;
      }
    }
  console.log("index=>",  index, "socketId=>",socket.id);
 
  });  

 
})

// the room creator has the power to start the game



httpServer.listen(process.env.PORT || 8000, () => {
  console.log("we are listening on");
});


// I will have a joined Between array where I will add it to that
// and then I will sync that with turnCount part to make sure
// that We have 