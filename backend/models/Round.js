const { socketIdMap } = require("../services/state.js");
let startTimeOut = null;


function handleMessage(message, roomObj, socketId, roomId, io) {
    let wordToGuess = roomObj.roundState.wordToGuess;
    let userName = roomObj.playersMap.get(socketId).userName;
    let drawerId=roomObj.roundState.drawerId



    let messageArray = roomObj.roundState.messageArray
    // not allowed to type anything while he is drawing


    if (socketId!=drawerId && checkWord(message, wordToGuess)) {
        increaseScore(roomObj,socketId)
        messageArray.push({ userName, message: 'Guessed Correctly' });
        roomObj.roundState.numberOfPlayersGuessed++;
    }
    else {
        messageArray.push({ userName, message: message })
    }
    io.to(roomId).emit('guessedWord', messageArray)
}

function checkWord(word, wordToGuess) {

    if (word == wordToGuess) {
        return true
    }

    return false;
}




// socktIdMap is a room id having the players

const Words = ['king', 'fast', 'kill', 'mango', 'orange', 'apple', 'virat', 'delhi', 'mumbai',
    'varanasi', 'haveri', 'hubli', 'mangalore', 'cheannai', 'pune', 'kumar', 'pooja', 'saswati'
]

function increaseScore(roomObj, socketId) {
    if (!roomObj.roundState.playersMap.get(socketId).score) {
        let score = 1000 - (0.03) * (Date.now() - roomObj.roundState.startedAt)
        roomObj.roundState.playersMap.get(socketId).score=score;
        console.log(roomObj.playersMap)
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

    // console.log("this is in the syncFunction",roomPlayersMap);
    // sort the elements based on the score and give them rank;


}


function endRound(roomObj, roomId, io) {

    console.log('we have receieved End round Here')

    let disconnectedSet = roomObj.disconnectedSet;
    let usersInfoArray = [...roomObj.playersMap];
   
    // get the total active players from the array 
    // I should not 
    

 
    if (disconnectedSet.size) {

        let filteredArray = usersInfoArray.filter((user) => {
            return (!disconnectedSet.has(user[0]))
        })
        usersInfoArray = filteredArray;
    }

    let activePlayers=roomObj.playersMap.size-disconnectedSet.size;
    let numberOfPlayersGuessed=roomObj.roundState.numberOfPlayersGuessed;
    let drawerId=roomObj.roundState.drawerId;


    let drawerScore=(1000/(activePlayers-1))*(numberOfPlayersGuessed);
    console.log('drawerSocre', drawerScore)
    console.log('drawerUserName', roomObj.playersMap.get(drawerId).userName)

    // increase the score of the drawer after some time
    roomObj.roundState.playersMap.get(drawerId).score=drawerScore;

    syncRound(roomObj, roomId);


  
  
    io.to(socketIdMap.get(roomId)[(roomObj.roundState.turnCount - 1)]).emit('removeDrawer', "word");
   


   



    // update the score for the drawer
   

    

    io.to(roomId).emit('dataForGame', usersInfoArray, roomObj.settings.timeLimit);
    console.log(usersInfoArray, "THis is usersInfo Array")


    startNewRound(roomObj, roomId, io);


}
// i think when we don't send any messages it disconnects 
// so because of that we get some problem



function startNewRound(roomObj, roomId, io) {
    // send all the players data in the starting

    let wordSet = new Set();
    //    console.log('we have started new round')

    while (wordSet.size != 3) {
        let word = Words[Math.floor(Math.random() * Words.length)]
        wordSet.add(word);
    }

    let wordArray = [...wordSet];



    let socketArray = socketIdMap.get(roomId);
    let disconnectedSet = roomObj.disconnectedSet;
    let turnCount=roomObj.roundState.turnCount;

    while (disconnectedSet.has(socketArray[roomObj.roundState.turnCount])) {
        roomObj.roundState.turnCount++;
    }

    if (roomObj.roundState.turnCount == roomObj.playersMap.size) {
        roomObj.roundState.turnCount = 0;
    }

    roomObj.roundState.drawerId=socketIdMap.get(roomId)[turnCount]

    io.to(socketArray[roomObj.roundState.turnCount++]).emit('setDrawer', wordArray);
    

    // io.to(roomId).emit('maskedWord', word.length);

    // I will have a timeOut to start the game before the 10 seconds;
    
    

    startTimeOut = setTimeout(() => {
        roomObj.roundState.startedAt = Date.now();
        roomObj.roundState.wordToGuess = 'virat';
        io.to(roomId).emit('startTimer', roomObj.settings.timeLimit)
        setTimeout(() => {
            endRound(roomObj,roomId,io)
        }, roomObj.settings.timeLimit)
        console.log('we are in timeOut')
       
    }, 5000)

   
    


    let canvasInterval = setInterval(() => {
        io.to(roomId).emit('canvas-data', roomObj.roundState.canvasData);
        roomObj.roundState.canvasData = [];
        // I am sending the canvas data
    }, 300)

    setTimeout(() => {
        clearInterval(canvasInterval)
    }, roomObj.settings.timeLimit)



}

function wordChosen(word, roomObj, io, roomId) {
    roomObj.roundState.startedAt = Date.now();
    roomObj.roundState.wordToGuess = word;
    setTimeout(() => {
        endRound(roomObj, roomId, io)
    }, roomObj.settings.timeLimit)

}

// game logic for drawer
// now the score of the person depends on the number of players 
// if a person joins in the middle he will not get the chance in this round


module.exports = { startNewRound, increaseScore, handleMessage, startTimeOut, wordChosen }