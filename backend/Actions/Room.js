

function increaseScore(roomStateMap,roomId, socketId, score){
    roomStateMap.get(roomId).playersMap.get(socketId).score+=score
}

module.exports={increaseScore}
