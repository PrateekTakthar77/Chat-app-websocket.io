import { log } from "console";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io"
import { fileURLToPath } from "url";
import { dirname } from "path";
import onSocket from "./socket.js";
const _filename = fileURLToPath(import.meta.url)
const _dirname = dirname(_filename)

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer);

const port = process.env.PORT || 9090;
httpServer.listen(port, () => console.log(`App is listening on ${port}`));

app.get('/', (req, res, next) => {
    res.sendFile(_dirname + "/public/index.html");
});
app.use(express.static(_dirname + "/public"))
onSocket(io);