const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname + '/../public');
const http = require('http');
const server = http.createServer(app);
app.use(express.static(publicPath));

server.listen(3000, () => {
    console.log('server is running on port 3000');
});
