const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require("socket.io");
const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: 'http://localhost:3000' });
app.use(cors({ origin: '*' }));

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

server.listen(8000, () => {
    console.log("server running");
});
