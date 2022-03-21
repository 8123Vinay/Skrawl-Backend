const {Server}=require('socket.io');



class GameSocket{
    instance=null;

    init(http_server){
       this.instance=new Server(http_server, {
        cors:{
            origin:[
                'http://localhost:3000'
            ]
         }
        }
      )
    }

    getValue(){
        return this.instance;
    }
}
//this is the functionality of creating a gameSocekt connectio
//and now i have to create a room 

function createJoinRoom(socket, id){
   socket.join(id);
   console.log("we have another player")
}



module.exports={GameSocket, createJoinRoom}
