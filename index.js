import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("landing.ejs");
});

app.post("/index", (req, res) => {
    res.render("index.ejs", {
        "username": req.body.username,
    });
});

io.on("connection", (socket) => {
    const username = socket.handshake.query.username;

    io.emit("new user", username);

    socket.on("chat message", (data) => {
        const username = data.username;
        const message = data.message;
        io.emit("chat message", data);
    });

    socket.on("disconnect", () => {
        io.emit("gone user", username);
    });
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});