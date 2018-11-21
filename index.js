var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

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

app.get('/chat', function(req, res) {
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
    });

    socket.on('chat message', function(data) {
        for (var i in emojiArray) {
            var regex = new RegExp(escapeSpecialChars(i), 'gim');
            data = data.replace(regex, String.fromCodePoint(emojiArray[i]));
        }

        io.emit('chat message', {
            username: socket.username,
            message: data
        });
    })

    socket.on('user is typing', function() {
        io.emit('user is typing', socket.username);
    })

    socket.on('user is not typing', function () {
        io.emit('user is not typing', 'A user is not typing');
    })
})

http.listen(9445, function() {
    console.log('listening on *:9445');
});