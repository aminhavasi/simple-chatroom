const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
require('dotenv').config();
app.use(express.json());
app.post('/api/auth/register', (req, res) => {
    res.status(200).send('hello');
});
server.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});
