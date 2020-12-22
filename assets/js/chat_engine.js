class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBoxId = $(`${chatBoxId}`);
        this.userEmail = userEmail;
        this.socket = io.connect('http//:localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        
        let self = this;

        this.socket.on('connect', function(){
        console.log('connection established using sockets...!')

        self.socket.emit('join_room', {
            user_email:self.userEmail,
            chatroom:'codeial'
        });

        self.socket.on('user_joined', function(data){
            console.log('Auser joined', data);
        })
    });

        //send a message on clicking the send button
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if(msg != ' '){
                self.socket.emit('send_message', {
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:'codeial'
                });
            }
        });


        //recieve_message event was detected and we appended the HTML element to DOM
        self.socket.on('recieve_message', function(data){
            console.log('message recieved', data.message);



            let newMessage = $('<li>');

            let messageType = 'other-message';

            if(data.userEmail == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html':data.message
            }));

            newMessage.append($('<sub>', {
                'html':data.user.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-message-list').append(newMessage);
        })
    
    }
}