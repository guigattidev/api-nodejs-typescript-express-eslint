import express, { Application } from "express";
import cors from "cors";
import * as dotenv from "dotenv";

// Import routes
// import userRouter from "./routes/userRouter.js";
import paymentRouter from "./routes/paymentRouter.js";

// Dot env config init
dotenv.config();

// Config express and port vars
const app: Application = express();
const PORT: string | number = process.env.APP_PORT || 8080;

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

export default app;
