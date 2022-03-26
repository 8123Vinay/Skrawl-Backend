const { socketIdMap }=require("../services/state.js")

// socktIdMap is a room id having the players

// function setWord(word,roomObj){
//    roomObj.roundState.wordToGuess=word;
// }


function emit(io, Id, messageType, message){
   io.to(Id).emit(messageType, message)
}

function syncRound(roomObj){
    let roomPlayersMap=roomObj.playersMap;
    let roundPlayersMap=roomObj.roundState.playersMap

    roundPlayersMap.forEach((value,key)=>{
           roomPlayersMap.get(key).score+=value
    })
// after syncing we will send a word to the client who is the drawer
}

function startNewRound(roomObj,roomId, io, word){
    console.log('New round started fron the round obj')
    // let y=setInterval(()=>{
    //    io.to(roomId).emit("canvas-data", roomObj.roundState.canvasData);
    // //    set it to zero
    //    roomObj.roundState.canvasData=[];

    // },100)

    // before starting new round we have to sync the round
    // increase the round count go till the last
//    let roomObj=roomStateMap.get(roomId)
//    console.log(socketIdMap.get(roomId))
   
//    roomObj.roundState.turnCount+=1;
   if(roomObj.roundState.turnCount==socketIdMap.get(roomId).length){
    //   clearInterval(x);
      emit(io,roomId,"GameEnd", "The game Has Ended")
      console.log('game Has ended')
      return;
   }
   count=roomObj.roundState.turnCount;
//    i have increased the turn count

// now send the word to the person in the count in the map

   syncRound(roomObj);

   emit(io,roomId,"scoreUpdate", roomObj.playersMap)

   roomObj.roundState.wordToGuess=word;

   emit(io,socketIdMap.get(roomId)[count],"wordToGuess", word)
//    first sync and then start new round


    roomObj.roundState.playersMap.forEach((value)=>{
      value.score=0;
    })
    
   
}


// sync round and end round are same
// I have to run sync round after some time


// function endRound(roomStateMap,roomId,io){
//     let roomObj=roomStateMap.get(roomId);
//     setTimeout(()=>{
//         syncRound(roomObj.playersMap, roomObj.roundState.playersMap)
//         newSocket.instance.to(roomId).emit('end-round' , "Round Ended")
//         // sync after room ended 
//         syncRound(roomStateMap, roomId)
//         // Now the round is ended I will send the score
//         let array=[];

//         roomObj.playersMap((value)=>{
//             // Key is socket id here
//             //value is a object

//             array.push({userName:value.userName, score:value.score})
//         })
      
//         io.to(roomId).emit('scores', array)
//         // this will send the score at the end of each round


//         if(roundsLeft>0){
//            startNewRound(roomStateMap,roomId,io)
//         }
        
//       },roomObj.settings.timeLimit)
// }




module.exports={startNewRound, syncRound, emit}