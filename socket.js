const users = [];

const onSocket = (io) => {
    io.on("connection", (socket) => {
        socket.on("user:join", (name) => {
            if (!users.some((user) => user.name === name)) {
                users.push({ name, socketId: socket.id });
                io.emit("global:message", `${name} just joined!`);
            }
        });

        socket.on("message:send", (payload) => {
            socket.broadcast.emit("message:receive", payload);
        });

        socket.on("disconnect", () => {
            const disconnectedUserIndex = users.findIndex(
                (user) => user.socketId === socket.id
            );
            if (disconnectedUserIndex !== -1) {
                const disconnectedUser = users[disconnectedUserIndex];
                users.splice(disconnectedUserIndex, 1);
                io.emit("global:message", `${disconnectedUser.name} just left`);
            }
        });
    });
};

export default onSocket;
