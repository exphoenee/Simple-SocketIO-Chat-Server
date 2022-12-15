const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());

const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5500",
  "http://localhost:8080",
  "http://localhost:8081",
];

const io = new Server(server, {
  cosrs: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
