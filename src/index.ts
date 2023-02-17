import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const server = express();

server.get("/", (req, res) => {
    res.send("Hello world");
});

server.listen(process.env.APP_PORT, () => {
    console.log("Server listening on port " + process.env.APP_PORT);
});
