const express = require("express");
const http = require("http");
const app = express();
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("join_chat", () => {
    console.log("user joined chat room");
    socket.join("chat_room"); // Only one room with id chat_room for all users as described in assignment
  });

  socket.on("send_message", (data) => {
    socket.to("chat_room").emit("receive_message", data);
  });
});

server.listen(8000, () => {
  console.log("server started");
});
