const { socketIdMap }=require("../services/state.js")

// socktIdMap is a room id having the players

// function setWord(word,roomStateMap.get(roomId)){
//    roomStateMap.get(roomId).roundState.wordToGuess=word;
// }

function increaseScore(roomStateMap,roomId, socketId){
    let score=1000-(0.01)*(Date.now()-roomStateMap.get(roomId).roundState.startedAt)
    console.log((Date.now()-roomStateMap.get(roomId).roundState.startedAt))
    roomStateMap.get(roomId).roundState.playersMap.get(socketId).score=score
    
}



function emit(io, Id, messageType, message){
   io.to(Id).emit(messageType, message)
}

function syncRound(roomStateMap,roomId){

    roomStateMap.get(roomId).roundState.playersMap.forEach((value,key)=>{
        roomStateMap.get(roomId).playersMap.get(key).score+=value.score;

    })
    console.log("THis is aasdfsdfasdfasdf",roomStateMap.get(roomId).playersMap)

    // and make score of the players zero in the round;
    roomStateMap.get(roomId).roundState.playersMap.forEach((value,key)=>{
        value.score=0;
    })
    
    // console.log("this is in the syncFunction",roomPlayersMap);
  

}

function startNewRound(roomStateMap,roomId, io, word,x){
  
    roomStateMap.get(roomId).roundState.startedAt=Date.now();
    
    if(roomStateMap.get(roomId).roundState.turnCount+1==socketIdMap.get(roomId).length){
        clearInterval(x);
        return;
    }

    syncRound(roomStateMap,roomId);

    let array=[];
    roomStateMap.get(roomId).playersMap.forEach((value,key)=>{
        array.push({socketId:key, value:value})
    })
     
    
    let usersInfoArray=[...roomStateMap.get(roomId).playersMap];
    // roomStateMap.get(roomId).playersMap.forEach((value,key)=>{
    //   usersInfoArray.push(value)
    // })



    io.to(roomId).emit("usersInfo", usersInfoArray)
   

    io.to(roomId).emit('clear-canvas', "hello"); 

    if(roomStateMap.get(roomId).roundState.turnCount+1){
        io.to(socketIdMap.get(roomId)[(roomStateMap.get(roomId).roundState.turnCount)]).emit('removeDrawer',"word");
    }

    // clear the canvas for all users

    
    io.to(socketIdMap.get(roomId)[++(roomStateMap.get(roomId).roundState.turnCount)]).emit('setDrawer', word);

    let y=setInterval(()=>{      
        io.to(roomId).emit('canvas-data', roomStateMap.get(roomId).roundState.canvasData)
        roomStateMap.get(roomId).roundState.canvasData=[];
      // I am sending the canvas data
    },300)
   
 

  
    setTimeout(()=>{
        clearInterval(y);
    },10000)

// I have to change the score according to the time

  
}



module.exports={startNewRound, syncRound, emit,increaseScore}