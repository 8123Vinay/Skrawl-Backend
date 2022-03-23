
const roomStateMap=new Map();

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
    constructor(timeLimit){
        this.playersMap=new Map();
        this.timeLimit=timeLimit
    }
}



class RoomStateClass{
     constructor(settings,roundState,startState){
        this.settings=settings
        this.playersMap=new Map()
        this.roundState=roundState
        this.startState=startState
       
    }
}


// I have a new map object Now I have to add the playerInfoClass to the RoomStateClass


// now I have created a room Objcet and I have a map
// I want to add player to the room

// let x=roomState.get('roomName')
// // I have roomStateClass with me now
// let userMap=x.players;
// // I have usersMap with me now



function createRoom(RoomId, rounds, timeLimit,startState){
    let setting1=new SettingsClass(rounds,timeLimit);
    let round1=new RoundStateClass(timeLimit)
    let Room1=new RoomStateClass(setting1,round1,false)
    
    roomStateMap.set(RoomId, Room1);

}

function joinRoom(roomId, socketId,userName){
    let player1=new PlayerInfoClass(userName, 0)
    let roomObj=roomStateMap.get(roomId)
    let playersMap=roomObj.playersMap;
    playersMap.set(socketId, player1) ;
    roomObj.roundState.playersMap.set(socketId, player1)

}

// I have to have the time limit 

// can I have a round object in the room state only



module.exports={roomStateMap,PlayerInfoClass, SettingsClass, RoomStateClass,joinRoom,createRoom,RoundStateClass}



// round state we have to do 
// round state has to get settings from the room state

