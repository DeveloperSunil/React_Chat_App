import express from "express";
import http from "http";
import { Server as socketIo } from "socket.io"; // Use named import for socket.io
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Update this if your React app runs on a different port
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User ID :- ${socket.id} joined room : ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log("send message data ", data.room);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected..", socket.id);
  });
});

server.listen(5005, () => console.log("Server is running on port 5005"));
