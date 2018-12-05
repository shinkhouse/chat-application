var app = require('express')();
const express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
const fs = require('fs');
var chatHistory = [];
var usersList = [];

var emojiArray = {
    ":)":"0x1F642", 
    "(:":"0x1F642", 
    ":(":"0x1F641", 
    "):":"0x1F641", 
    ";)":"0x1F609",
    ":D":"0x1F603",
    ":P":"0x1F61B",
    ":/":"0x1F615",
    ":\\": "0x1F615",
    "<3":"0x2764",
} 

function escapeSpecialChars(regex) {
    return regex.replace(/([()[{*+.$^\\|?])/g, '\\$1');
}

app.use(express.static(__dirname + '/'));

io.on('connection', function(socket) {
    // io.emit('chat message', 'Someone connected');
    socket.emit('check for username');
    socket.on('disconnect', function() {
        // console.log(socket.username);
        usersList.forEach(function(user, index, object) {
            if(user.user == socket.username) {
                object.splice(index,1);
            }
        }); 
        io.emit('user removed', socket.username);
    });
    socket.on('user reconnected', function(username) {
        socket.username = username;
        usersList.push({
            "user": username,
            "socket": socket,
            "status": 1
        });
        fs.readFile('messages.json', function (err, data) {
            chatHistory = JSON.parse(data);
            socket.emit('chat history', chatHistory);
            io.emit('user reconnected', username);
        });
        // console.log(usersList);
    });
    socket.on('user added', function(username) {
        socket.username = username;
        usersList.push({
            "user": username,
            "socket": socket,
            "status": 1
        });
        fs.readFile('messages.json', function (err, data) {
            chatHistory = JSON.parse(data);
            socket.emit('chat history', chatHistory);
            io.emit('user added', username);
        });
        
    });
    socket.on('show users', function() {
        socket.emit('show users', userList);
    });

    socket.on('chat message', function(data) {
        var messageData = {};
        if (data.indexOf("/private") == "0") {
            // console.log(usersList);
            var command = data.split(" ");
            var username = command[1];
            var message = command.slice(2).join(" ");

            if(username != socket.username) {
                var messageData = {
                    username: socket.username,
                    message: message
                }

                for (var i in usersList) {
                    if (usersList[i].user == username) {
                        usersList[i].socket.emit('chat message', messageData);
                        socket.emit('chat message', messageData);
                    } else {
                        var messageData = {
                            username: "Server",
                            message: "Error: This user was not found. Please try another user. 🙂"
                        }
                        socket.emit('chat message', messageData);
                    }
                }
            } else {
                var messageData = {
                    username: "Server",
                    message: "Error: You cannot send a message to yourself."
                }
                socket.emit('chat message', messageData);
            }
            
        } else {
            for (var i in emojiArray) {
                var regex = new RegExp(escapeSpecialChars(i), 'gim');
                data = data.replace(regex, String.fromCodePoint(emojiArray[i]));
            }
            messageData = {
                username: socket.username,
                message: data
            }
            fs.readFile('messages.json', function (err, data) {
                var json = JSON.parse(data);
                json.push(messageData);
                fs.writeFile("messages.json", JSON.stringify(json), function (err) {
                    if (err) throw err;
                    console.log("saved");
                });
            })
            io.emit('chat message', messageData);
        }
    });

    socket.on('user is typing', function() {
        io.emit('user is typing', socket.username);
    });

    socket.on('user is not typing', function () {
        io.emit('user is not typing', 'A user is not typing');
    });
})

http.listen(process.env.PORT || 9446, function() {
    console.log('listening on *:9445 or ' || process.env.PORT);
});