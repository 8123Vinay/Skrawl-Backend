
const {startNewRound}=require("./Round")
const { socketIdMap }=require("../services/state.js")

function playerDisconnected(roomId,roomObj){
  let userName=roomObj.playersMap.get(socket.id).userName;
  roomObj.disconnectedSet.add(socket.id)
  // I have to send 
  
  newSocket.instance.to(roomId).emit('playerDisconnected', userName);
}

// (roomObj,roomId, io, word)

// <roomId, [socketIds]> this is socketIdMap

function startGame(roomObj,io,roomId){
    // io.to(roomId).emit('startState', true);

    // I have to call the next game again and again
    // 10S extra to choose the word
    // if word Is not chosen first I will choose
    
     
     let usersInfo=[...roomObj.playersMap];
     let timeLimit=roomObj.settings.timeLimit;

     io.to(roomId).emit("initialData", usersInfo, timeLimit, roomObj.startState);
     startNewRound(roomObj,roomId,io);


    
    // I will keep the count the number of players and who will be the drawer
    // next

   


}


module.exports={startGame}