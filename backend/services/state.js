
const roomStateMap=new Map();
const socketIdMap=new Map();

// class SockedIdMap{
//    constructor(){
//        this.array=[];
//    }
// }


function addToSocketIdMap(roomId,rooms){
//    let array=Array.from(rooms.get(roomId))
//    socketIdMap.set(roomId, array)
   
//   
}



class PlayerInfoClass{
    constructor(userName,score){
        this.userName=userName;
        this.score=score

    }
   
}

class SettingsClass{
    constructor(rounds, timeLimit){
        this.rounds=rounds;
        this.timeLimit=timeLimit
    }
}


// I have to have a constructor class for round


class RoundStateClass{
    constructor(wordToGuess,turnCount,startedAt,messageArray){
        this.playersMap=new Map();
        this.wordToGuess=wordToGuess;
        this.turnCount=turnCount;
        this.roundCanvasData=[];
        this.startedAt=startedAt
        this.drawerId=undefined;
        this.chooSingWord=false;
        this.lastCanvasData=[];
        this.guessedSet=new Set();
       
    }
}



class RoomStateClass{
     constructor(settings,roundState,startState){
        this.settings=settings
        this.playersMap=new Map()
        this.roundState=roundState
        this.startState=startState
        this.roundsPlayed=1;
        this.joinedInBetween=[];
        this.timeOuts={};
        
    }
}


function createRoom(RoomId, rounds, timeLimit, startState){
    let setting1=new SettingsClass(rounds,timeLimit);
    let round1=new RoundStateClass('apple',0, 1,[]);
    // empty array to the canvas data;
    let Room1=new RoomStateClass(setting1,round1,startState)
    
    roomStateMap.set(RoomId, Room1);

}

function joinRoom(roomId, socketId,userName){
    let player1=new PlayerInfoClass(userName, 0);
    let player2={...player1};
    let roomObj=roomStateMap.get(roomId);
    let playersMap=roomObj.playersMap;
    playersMap.set(socketId, player1);
    addToSocketIdMap()
    
    roomObj.roundState.playersMap.set(socketId, player2);

}



module.exports={roomStateMap,PlayerInfoClass, SettingsClass, RoomStateClass,joinRoom,createRoom,RoundStateClass,addToSocketIdMap,socketIdMap}




