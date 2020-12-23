
//socketServer and socket is pre-defined class of socket.io library
module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket){
        console.log('new connection recieved', socket.id);

        //disconnect the socket
        socket.on('disconnect', function(){
            console.log('socket disconnected');

        });

            socket.on('join_room', function(data){
                console.log('joining request recieved', data);

                socket.join(data.chatroom);

                io.in(data.chatroom).emit('user_joined', data);
            
        });

        //detect send_message and broadcast to everyone in the room 
        socket.on('send_message', function(data){
            //recieve_message event fired 
            io.in(data.chatroom).emit('recieve_message', data);
        });
    })
}
