var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3001, function(){
    console.log("Server Running on port 3001")
});

app.use(express.static('client'));

var messages = [{
    id: 1,
    text: 'Welcome!',
    nickname: 'Chat Bot'
}];

io.on('connection', function(socket){
    console.log(socket.handshake.address);
    socket.emit('messages', messages);

    socket.on('add-message', function(data){
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});