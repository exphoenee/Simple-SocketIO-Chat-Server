const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());

const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5500",
  "http://localhost:8080",
  "http://localhost:8081",
];

let users = [];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  socket.on("login", (data) => {
    users = [...users, data];
    socket.broadcast.emit("active_users", users);
  });

  socket.on("active_users", (users) => {
    socket.emit("active_users", users);
  });

  socket.on("logout", (data) => {
    console.log(`User: ${data.username} logged out`);
    users = users.filter((user) => user.id !== data.id);
    console.log(users);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.broadcast.emit("receive_message", data);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
