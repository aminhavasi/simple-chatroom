const http = require('http');
const express = require('express');
const app = express();
const socketIo = require('socket.io');
const path = require('path');
const server = http.createServer(app);
//************************************************** */

const publicPath = path.join(__dirname + '/../public');
require('dotenv').config();
app.use(express.static(publicPath));
const io = socketIo(server);

io.on('connection', socket => {
    console.log('a new user just connected');
    socket.on('disconnect', () => {
        console.log('disconnect');
    });
});
server.listen(process.env.PORT, () => {
    console.log('server is running on port 3000');
});
