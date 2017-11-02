let socket = io();
socket.on('connect', function() {
    console.log('connected to server');

    // socket.emit('createEmail', {
    //     to: "janeappleseed@example.com",
    //     message: "hello there"
    // });

    socket.emit('createMessage', {
        from: 'andrew',
        text: 'reply'
    });

});
socket.on('disconnect', function() {
    console.log('Disconnected from the server');
});

socket.on('newMessage', function(message) {
    console.log('new email');
    console.log(message);
})

