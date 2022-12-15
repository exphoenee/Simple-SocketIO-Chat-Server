const express = require("express");
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

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);
  socket.on("send_message", (data) => {
    console.log(data);
    socket.broadcast.emit("receive_message", data);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
