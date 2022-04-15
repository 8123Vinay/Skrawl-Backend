const { socketIdMap } = require("../services/state.js");



function handleMessage(message, roomObj, socketId, roomId, io) {
    let wordToGuess = roomObj.roundState.wordToGuess;
    let userName = roomObj.playersMap.get(socketId).userName;
    let drawerId = roomObj.roundState.drawerId
    let guessedSet=roomObj.roundState.guessedSet;

    if (socketId != drawerId && checkWord(message, wordToGuess) && !guessedSet.has(socketId)) {
        increaseScore(roomObj, socketId);
        roomObj.roundState.guessedSet.add(socketId);

        io.to(roomId).emit('groupMessage', ({ userName, message: 'Guessed Correctly', socketId }), [...roomObj.roundState.guessedSet]);

    }
    else {
        io.to(roomId).emit('groupMessage', { userName, message: message, socketId })
    }

}

function checkWord(word, wordToGuess) {

    if (word == wordToGuess) {
        return true
    }

    return false;
}




// socktIdMap is a room id having the players

const Words = ['king', 'fast', 'kill', 'mango', 'orange', 'apple', 'virat', 'delhi', 'mumbai',
    'varanasi', 'haveri', 'hubli', 'mangalore', 'cheannai', 'pune', 'kumar', 'pooja', 
]

function increaseScore(roomObj, socketId) {
    if (!(roomObj.roundState.playersMap.get(socketId).score)) {
        let score = parseInt(1000 - (0.03) * (Date.now() - roomObj.roundState.startedAt))
        roomObj.roundState.playersMap.get(socketId).score = score;

    }

}



function emit(io, Id, messageType, message) {
    io.to(Id).emit(messageType, message)
}

function syncRound(roomObj, roomId) {

    roomObj.roundState.playersMap.forEach((value, key) => {
        roomObj.playersMap.get(key).score += value.score;

    })


    // and make score of the players zero in the round;
    roomObj.roundState.playersMap.forEach((value, key) => {
        value.score = 0;
    })




}


function endRound(roomObj, roomId, io) {

    clearInterval(roomObj.timeOuts.canvasInterval);

    let numberOfPlayersGuessed = roomObj.roundState.guessedSet.size;
    let drawerId = roomObj.roundState.drawerId;


    let drawerScore = parseInt((1000 / (roomObj.playersMap.size - 1)) * numberOfPlayersGuessed);



    // increase the score of the drawer after some time
    if(roomObj.roundState.playersMap.get(drawerId)){
        (roomObj.roundState.playersMap.get(drawerId)).score = drawerScore;
    }
   



    // set It to zero
    

    io.to(socketIdMap.get(roomId)[(roomObj.roundState.turnCount - 1)]).emit('removeDrawer', "word");

    let roundInfo = [...roomObj.roundState.playersMap];

    io.to(roomId).emit('roundScore', roundInfo, roomObj.roundState.wordToGuess);

    roomObj.roundState.roundCanvasData = [];

    syncRound(roomObj, roomId);

    let usersInfoArray = [...roomObj.playersMap];

    usersInfoArray.sort((a, b) => {
        return (b[1].score - a[1].score);
    })

    for (let i = 0; i < usersInfoArray.length; i++) {
        let socketId = ((usersInfoArray[i])[0]);
        //    we got the socket Id of the ith rank player
        (roomObj.playersMap.get(socketId)).rank = i + 1;

    }
   
    roomObj.roundState.guessedSet.clear();

    // roundended Set the guessedSet to null
    if (roomObj.roundState.turnCount >= socketIdMap.get(roomId).length) {
        roomObj.roundState.turnCount = 0;
        if (roomObj.settings.rounds == roomObj.roundsPlayed) {
            roomObj.roundsPlayed=1;
            setTimeout(() => {
                io.to(roomId).emit('gameEnded', usersInfoArray);
                endGame(roomObj,roomId, io);              
            }, 10000)
            

            setTimeout(()=>{
                io.to(roomId).emit('startAgain', 'setStartFalse',[...roomObj.playersMap]);
              },20000);

              roomObj.timeOuts.startAgainTimeOut=setTimeout(()=>{
                io.to(roomId).emit('setStart', true);
               
                setTimeout(()=>{
                   startNewRound(roomObj,roomId,io);
                },1000)
             //   If there is no roomCreator set the first Person as the 
             // roomCreator
             },30000) 
            return;
        }

        else {
            roomObj.roundsPlayed++;
        }
        
    }

    // I have to disply all socres in sorted Order


    usersInfoArray = [...roomObj.playersMap];



    //    I will check here the logic of ending the game
   startGameTimeOut=setTimeout(() => {
        io.to(roomId).emit('updatedScore', usersInfoArray);
        startNewRound(roomObj,roomId,io);
  
    }, 8000);



}


function endGame(roomObj,roomId,io){
    roomObj.playersMap.forEach((value,key)=>{
        value.score=0;
    });

    roomObj.roundState.playersMap.forEach((value,key)=>{
        value.score=0;
    });
    roomObj.roundsPlayed=1;

}

function startNewRound(roomObj, roomId, io) {
    //    sync the joinedBetween array and the SocketIdMap;
    let wordSet = new Set();


    while (wordSet.size != 3) {
        let word = Words[Math.floor(Math.random() * Words.length)]
        wordSet.add(word);
    }

    let wordArray = [...wordSet];



    let socketArray = socketIdMap.get(roomId);

    roomObj.roundState.drawerId = socketIdMap.get(roomId)[roomObj.roundState.turnCount]


    let drawerId = roomObj.roundState.drawerId;
    let drawerUserName;
    if (roomObj.playersMap.get(drawerId)) {
        drawerUserName = roomObj.playersMap.get(drawerId).userName
        io.to(roomId).emit('setDrawer', wordArray, drawerId, drawerUserName, roomObj.roundsPlayed);
        roomObj.roundState.turnCount++;
    }




    roomObj.timeOuts.startRoundTimeOut = setTimeout(() => {
        roomObj.roundState.startedAt = Date.now();
        roomObj.roundState.wordToGuess = wordArray[0];
        io.to(roomId).emit('startRound', roomObj.settings.timeLimit);
        io.to(roomId).emit('startTimer', undefined);
        // do something now
    roomObj.timeOuts.endRoundTimeOut = setTimeout(() => {
            endRound(roomObj, roomId, io);
            
        }, roomObj.settings.timeLimit)

        

    }, 10000)



   


    roomObj.timeOuts.canvasInterval = setInterval(() => {
        io.to(roomId).emit('canvas-data', roomObj.roundState.lastCanvasData);
        roomObj.roundState.lastCanvasData = [];
        // I am sending the canvas data
    }, 300)

}

function wordChosen(word, roomObj, io, roomId) {
    roomObj.roundState.startedAt = Date.now();
    roomObj.roundState.wordToGuess = word;
    io.to(roomId).emit('startRound', roomObj.settings.timeLimit);
    io.to(roomId).emit('startTimer', undefined);
  endGameTimeOut=setTimeout(() => {
        endRound(roomObj, roomId, io)
    }, roomObj.settings.timeLimit)

}

// game logic for drawer
// now the score of the person depends on the number of players 
// if a person joins in the middle he will not get the chance in this round


module.exports = { startNewRound, increaseScore, handleMessage, wordChosen}