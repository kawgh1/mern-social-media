const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:4000",
    },
});

io.on("connection", (socket) => {
    console.log("A user connected");
    io.emit("welcome", "hello this is socket server");
});
