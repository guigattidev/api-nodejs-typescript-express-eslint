import express, { Request } from "express";
import cors from "cors";
import * as dotenv from "dotenv";

// Import lib
import Logger from "./helpers/logger.js";

// Import routes
import userRouter from "./routes/userRouter.js";
import paymentRouter from "./routes/paymentRouter.js";

// Dot env config init
dotenv.config();

// Config express and port vars
const app = express();
const PORT = process.env.APP_PORT || 8080;

// Get logger endpoint configs
app.get("/logger", (_, res) => {
    Logger.error("This is an error log");
    Logger.warn("This is a warn log");
    Logger.info("This is a info log");
    Logger.http("This is a http log");
    Logger.debug("This is a debug log");

    res.send("Hello world");
});

// Middleware cors and json body parser
app.use(cors());
app.use(express.json());

// Middleware api
// app.use("/api/users", userRouter);
app.use("", paymentRouter);

// Start server
app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});
