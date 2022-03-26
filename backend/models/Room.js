
const {startNewRound}=require("./Round")

function increaseScore(roomStateMap,roomId, socketId, score){
    roomStateMap.get(roomId).playersMap.get(socketId).score+=score
}

// (roomStateMap,roomId, io, word)

function startGame(roomObj,io,roomId){
    io.to(roomId).emit('startState', true);

      startNewRound(roomObj,roomId, io, 'kill');
    // I have to do this thing of clearing interval


}


module.exports={increaseScore,startGame}