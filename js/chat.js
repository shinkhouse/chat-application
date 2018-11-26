$(function () {
    var username = "";
    $('#message-send').hide();
    $('#usernamefield').keydown(function(e) {
        if(e.keyCode == 13) {
            username = $('#usernamefield').val().trim();
            if (username) {
                socket.emit('user added', username);
            }
            $('.addUser').hide();
            $('#message-send').show();
        }
    })
    $('#username-submit').on('click', function () {
        username = $('#usernamefield').val().trim();
        if (username) {
            socket.emit('user added', username);
        }
        $('.addUser').hide();
        $('#message-send').show();
    });

    var socket = io();
    $('#message-send').submit(function () {
        if ($('#m').val().trim().length > 0) {
            socket.emit('chat message', $('#m').val());
            $('#m').val('');
            socket.emit('user is not typing');
        }
        return false;
    });
    $('#m').on('click', function() {
        $('.emoji-dialog').hide();
    })
    $('#m').on('input', function () {
        if ($('#m').val().length > 0) {
            socket.emit('user is typing');
        } else {
            socket.emit('user is not typing');
        }
    })
    socket.on('check for username', function () {
        if (username) {
            socket.emit('user reconnected', username);
        } else {
            $('.addUser').show();
            $('#message-send').hide();
        }
    })
    socket.on('chat history', function (data) {
        console.log(data);
        for (var i in data) {
            if (username == data[i].username) {
                $('#messages').append($('<li class="username-content my-username">').text(data[i].username));
                $('#messages').append($('<li class="message-content my-message">').text(data[i].message));
            } else {
                $('#messages').append($('<li class="username-content">').text(data[i].username));
                $('#messages').append($('<li class="message-content">').text(data[i].message));
            }
            $("#messages").scrollTop($("#messages")[0].scrollHeight);
        }
    })
    socket.on('chat message', function (data) {
        if (username == data.username) {
            $('#messages').append($('<li class="username-content my-username">').text(data.username));
            $('#messages').append($('<li class="message-content my-message">').text(data.message));
        } else {
            $('#messages').append($('<li class="username-content">').text(data.username));
            $('#messages').append($('<li class="message-content">').text(data.message));
        }
        $("#messages").scrollTop($("#messages")[0].scrollHeight);
    });

    socket.on('user is typing', function (data) {
        if ($('.typing').length === 0) {
            if (username != data) {
                $('#messages').append($('<li class="typing">').text(data + " is typing..."));
            }
        }
        $('.typing').show();
    })

    socket.on('user is not typing', function () {
        $('.typing').remove();
    });

    socket.on('user added', function (username) {
        $('#messages').append($('<li class="user-update">').text(username + " has joined."));
        $("#messages").scrollTop($("#messages")[0].scrollHeight);
    });

    socket.on('user reconnected', function (username) {
        $('#messages').append($('<li class="user-update">').text(username + " has reconnected."));
        $("#messages").scrollTop($("#messages")[0].scrollHeight);
    });

    socket.on('user removed', function (username) {
        if (!username) {
            $('#messages').append($('<li class="user-update">').text("Someone has left."));
            $("#messages").scrollTop($("#messages")[0].scrollHeight);
        } else {
            $('#messages').append($('<li class="user-update">').text(username + " has left."));
            $("#messages").scrollTop($("#messages")[0].scrollHeight);
        }
    });
});