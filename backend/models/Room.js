
const {startNewRound}=require("./Round")
const { socketIdMap }=require("../services/state.js")


// (roomStateMap,roomId, io, word)

// <roomId, [socketIds]> this is socketIdMap

function startGame(roomStateMap,io,roomId,word){
    io.to(roomId).emit('startState', true);

    // I have to call the next game again and again
    // 10S extra to choose the word
    // if word Is not chosen first I will choose
    
   let x=setInterval(()=>{
     startNewRound(roomStateMap,roomId, io, word,x);
   }, 10000)

    
    // I will keep the count the number of players and who will be the drawer
    // next

   


}


module.exports={startGame}