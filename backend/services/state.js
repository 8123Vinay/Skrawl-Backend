const roomStateMap=new map();


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


let player1=new PlayerInfoClass('vinay', 0);
let player2=new PlayerInfoClass('ravi', 0)

// map of users
usersState.set('asdf', player1)
usersState.set('kl', player2)

// object of settings;
let settting1=Settings(3,1000);
let settting2=Settings(2,1000);

class RoomStateClass{
     constructor(settings){
        this.settings=settings
        this.playersMap=new map()
    }
}

// I have a new map object Now I have to add the playerInfoClass to the RoomStateClass
let Room1=new RoomStateClass(settings1)
roomStateMap.set('roomName', Room1);

// now I have created a room Objcet and I have a map
// I want to add player to the room

// let x=roomState.get('roomName')
// // I have roomStateClass with me now
// let userMap=x.players;
// // I have usersMap with me now

// I want to add a playerInfoClass to a new room
userMap.set('playerId', player1);
userMap.set('playerId', player2);


function createRoom(RoomId, rounds, timeLimit){
    let setting1=Settings(rounds,timeLimit);
    let Room1=new RoomStateClass(settings1)
    roomStateMap.set('RoomId', Room1);
    

}

function addNewUser(roomId, SocketId,userName){
    let player1=new PlayerInfoClass(userName, 0)
    let playersMap=roomStateMap.get("roomId").playersMap;

   playersMap.set(SocketId, player1) 
}



function increaseScore(roomId, socketId, scored){
    roomStateMap.get(roomId).playersMap.get(socketId).score+=scored
}


module.exports={roomStateMap, playerInfoClass, SettingsClass, RoomStateClass,addNewUser,increaseScore,createRoom}