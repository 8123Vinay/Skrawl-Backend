
function syncRound(roomPlayersMap, roundPlayersMap){
    //    I have the map now
        roomPlayersMap.forEach((value,key)=>{
           value.score+=roundPlayersMap.get(key).score 
    })
}

function startNewRound(roundPlayersMap){
    //   forEach player I have to set theirScore to zero
    roundPlayersMap.forEach((value)=>{
      value.score=0;
    })
    
}

module.exports={startNewRound, syncRound}