import express, { Request } from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import { userRouter } from "./modules/user/userRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);

app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
});
