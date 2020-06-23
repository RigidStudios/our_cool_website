const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.render('index.ejs');
});

const servers = [];

io.sockets.on('connection', function(socket) {
    socket.on('connector', function(obj) {
        if (servers.includes(obj.chat)) {
          socket.chat = obj.chat;
        } else {
          var server = {};
          server.name = obj.chat;
          server.users = 1;
          server.owner = obj.username;
          socket.chat = obj.chat;
        }
        io.emit('is_online', '<i>' + socket.username + ' has joined the chat..</i>', socket.chat);
        console.log(" + " + socket.username);
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '<i>' + socket.username + ' left the chat..</i>', socket.chat);
        console.log(" - " + socket.username)
    })

    // socket.on('is_typing', function(chat) {
    //   io.emit('typing_noti', socket.username, chat)
    // })

    socket.on('chat_message', function(obj, chat) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong> | ' + obj, chat);
    });

    socket.on('create', function(name) {
      if (servers.includes(obj.chat)) {
        socket.emit('failure_chat_create');
      } else {
        var server = {};
        server.name = obj.chat;
        server.users = 1;
        socket.chat = obj.chat;
      }
    });
});

const server = http.listen(1337, function() {
    console.log('listening on *:1337');
});
