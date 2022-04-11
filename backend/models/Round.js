const { socketIdMap } = require("../services/state.js");
let startGameTimeOut;
let endGameTimeOut;


function handleMessage(message, roomObj, socketId, roomId, io) {
    let wordToGuess = roomObj.roundState.wordToGuess;
    let userName = roomObj.playersMap.get(socketId).userName;
    let drawerId = roomObj.roundState.drawerId


    if (socketId != drawerId && checkWord(message, wordToGuess)) {
        increaseScore(roomObj, socketId);
        roomObj.roundState.guessedArray.push(socketId);

        io.to(roomId).emit('groupMessage', ({ userName, message: 'Guessed Correctly', socketId }), roomObj.roundState.guessedArray);

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
    'varanasi', 'haveri', 'hubli', 'mangalore', 'cheannai', 'pune', 'kumar', 'pooja', 'saswati'
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


    let numberOfPlayersGuessed = roomObj.roundState.guessedArray.length;
    let drawerId = roomObj.roundState.drawerId;


    let drawerScore = parseInt((1000 / (roomObj.playersMap.size - 1)) * numberOfPlayersGuessed);



    // increase the score of the drawer after some time
    (roomObj.roundState.playersMap.get(drawerId)).score = drawerScore;



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

    if (roomObj.roundState.turnCount >= socketIdMap.get(roomId).length) {
        if (roomObj.settings.rounds == roomObj.roundsPlayed) {
            setTimeout(() => {
                io.to(roomId).emit('gameEnded', usersInfoArray);
            }, 10000)

            return;
        }
        else {
            roomObj.roundState.turnCount = 0;
        }
    }

    // I have to disply all socres in sorted Order


    usersInfoArray = [...roomObj.playersMap];



    //    I will check here the logic of ending the game
    setTimeout(() => {
        io.to(roomId).emit('updatedScore', usersInfoArray);
        roomObj.roundState.guessedArray = [];
        startNewRound(roomObj, roomId, io);

    }, 7000);



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

    if (drawerId) {
        let drawerUserName = roomObj.playersMap.get(drawerId).userName
        io.to(roomId).emit('setDrawer', wordArray, drawerId, drawerUserName, roomObj.roundsPlayed);
        roomObj.roundState.turnCount++;
    }



    // io.to(roomId).emit('maskedWord', word.length);

    // I will have a timeOut to start the game before the 10 seconds;setDrawer



       roomObj.roundState.chooSingWord = true;
        startGameTimeOut =startTimeOut = setTimeout(() => {
        roomObj.roundState.startedAt = Date.now();
        roomObj.roundState.wordToGuess = 'virat';
        io.to(roomId).emit('startRound', roomObj.settings.timeLimit);
        io.to(roomId).emit('startTimer', undefined);
        // do something now
        endGameTimeOut = setTimeout(() => {
            endRound(roomObj, roomId, io)
        }, roomObj.settings.timeLimit)

        roomObj.roundState.chooSingWord = false;

    }, 5000)






    let canvasInterval = setInterval(() => {
        io.to(roomId).emit('canvas-data', roomObj.roundState.roundCanvasData);
        roomObj.roundState.lastCanvasData = [];
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


module.exports = { startNewRound, increaseScore, handleMessage, wordChosen,endGameTimeOut}