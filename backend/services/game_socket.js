const {Server}=require('socket.io');


// server is a class that creates the server here

class GameSocket{
    instance=null;

    init(http_server){
       this.instance=new Server(http_server, {
        cors:{
            origin:[
                'https://chic-eclair-8d3c48.netlify.app/'
            ]
         },
        }
      )
    }

    
}
//this is the functionality of creating a gameSocekt connectio
//and now i have to create a room 

function createJoinRoom(socket, id){
   socket.join(id);

}



module.exports={GameSocket, createJoinRoom}
