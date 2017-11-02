const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

//joins partial paths to avoid getting /websockets/server/../public
const publicPath = path.join(__dirname, '../public');
let port = process.env.PORT || 3000;

//express uses http normally uses http.createServer behind the scenes
let app = express();
// we can just use app as argument since the method takes a closure
let server = http.createServer(app);
//we use http in order to use socketio
let io = socketIO(server)


io.on('connection', (socket) => {
    console.log('new user'); 

    socket.emit('newEmail', {
        from: "johnappleseed@test.com",
        text: "Message",
        createdat: Date.now()
    });

    socket.emit('newMessage', {
        from: 'john',
        text: 'see you then',
        createdAt: Date.now()
    })

    socket.on('createMessage', (message) => {
        console.log('message ', message);
    })

    socket.on('createEmail', (email) => {
        console.log(email);
    })
    socket.on('disconnect', () => {
        console.log('client disconnect');
    });
 });

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`server is up at ${port}` );
});