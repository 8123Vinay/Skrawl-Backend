const {startNewRound,syncRound,emit}=require('./models/Round')
// i will have an array and then if any plyeer joins i will add him to array




// function runGame(roomObj){
//     let array=getPlayers(roomObj)
//     // I have array of SocketId of  the players
//     // start a new round
//     let counter=0;
//     // word Choose I will send it to the frontend he will send me a message



// }

function checkWord(word,wordToGuess){
   if(word==wordToGuess){
       return true;
   }
   return false;
}

module.exports={checkWord}
// I thinks the logic will handle all the starting and ending the game

// logic checks the score and after that
// It will update the score depending on that
