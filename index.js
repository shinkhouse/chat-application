var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const fs = require('fs');
var chatHistory = [];


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

app.get('/', function(req, res) {
    // res.send('<h1>Hello, world!</h1>');
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    // io.emit('chat message', 'Someone connected');

    socket.on('disconnect', function() {
        io.emit('user removed', socket.username);
    })
    socket.on('user added', function(username) {
        socket.username = username;
        io.emit('user added', username);
        fs.readFile('messages.json', function (err, data) {
            chatHistory = JSON.parse(data);
            socket.emit('chat history', chatHistory);
        });
        
    });

    socket.on('chat message', function(data) {
        for (var i in emojiArray) {
            var regex = new RegExp(escapeSpecialChars(i), 'gim');
            data = data.replace(regex, String.fromCodePoint(emojiArray[i]));
        }
        var messageData = {
            username: socket.username,
            message: data
        }

        fs.readFile('messages.json', function(err, data) {
            var json = JSON.parse(data);
            json.push(messageData);
            fs.writeFile("messages.json",JSON.stringify(json), function(err) {
                if(err) throw err;
                console.log("saved");
            });
        })
        io.emit('chat message', messageData);
    })

    socket.on('user is typing', function() {
        io.emit('user is typing', socket.username);
    })

    socket.on('user is not typing', function () {
        io.emit('user is not typing', 'A user is not typing');
    })
})

http.listen(process.env.PORT || 9446, function() {
    console.log('listening on *:9445 or ' || process.env.PORT);
});