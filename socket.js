const users = [];

const onSocket = (io) => {
    io.on("connection", (socket) => {
        socket.on("user:join", (name) => {
            !users.some((user) => user.name === name) &&
                users.push({ name, sockeld: socket.id });
            io.emit("global:message", `${name} just joined!`)
        });
        socket.on("message:send", (payload) => {
            socket.broadcast.emit("message:recieve", payload)
        })
        socket.on("disconnect", () => {
            const user = users.filter((user) => user.sockeld === socket.id);
            io.emit("global:message", `${user[0].name} just left`)
        });
    });
};

export default onSocket;