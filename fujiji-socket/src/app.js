// Express
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'develop' || process.env.NODE_ENV === 'test') {
  dotenv.config();
}

const express = require('express');
const cors = require('cors');
const { config } = require('./config/config');
const http = require("http");
const { Server } = require('socket.io');


const appUrl = config.APP_URL;
const port = config.PORT || 3000;

const app = express();

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: `http://${appUrl}:${port}`
  }
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  const result=users.find((user) => {
    return user.userId == userId});
  return result;
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    console.log("user Added");
    addUser(userId, socket.id);
    console.log(users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderID, receiverID, text }) => {
    console.log("received message");
    const user = getUser(receiverID);
    if(user){
      console.log("sending back message");
    io.to(user.socketId).emit("getMessage", {
      receiverID,
      senderID,
      text,
    });}
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
  });
});

app.options('*', cors()); // include before other routes
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  /* istanbul ignore next */
  httpServer.listen(port, async () => {
    console.log(`Server is up on port ${appUrl}:${port}`);
  });
}

module.exports = app;
