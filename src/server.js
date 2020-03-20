const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const mongoose = require('mongoose');
//-------------------------------------------------
require('dotenv').config();
mongoose.connect(process.env.URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});
app.use(express.json());
const auth = require('./routes/auth');
app.use('/api/auth', auth);
server.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});
