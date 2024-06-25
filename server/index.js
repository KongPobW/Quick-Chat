const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const socket = require("socket.io");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth/", userRoutes);
app.use("/api/message/", messageRoutes);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connected database successfully");
}).catch((err) => {
    console.log(err.message);
});

const server = app.listen(process.env.PORT, () =>
    console.log(`server started on ${process.env.PORT}`)
);

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {

    global.chatSocket = socket;

    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sentUser = onlineUsers.get(data.to);
        if (sentUser) {
            socket.to(sentUser).emit("msg-receive", data.message);
        }
    });
});