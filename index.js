/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const { createRouter } = require('express-fsr');

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to database'));

const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const socketHandler = require('./socket/index.js');

io.on('connection', socketHandler.bind(this, io));

app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.use(
  '/api',
  createRouter({
    baseDir: path.join(__dirname, 'api'),
  })
);

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

const PORT = process.env.PORT ?? 3000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
