import { Router } from "express";

import {
    paymentBalance,
    paymentEvent,
} from "../controllers/paymentController.js";

const userRouter = Router();

userRouter.get("/balance", paymentBalance);
userRouter.post("/event", paymentEvent);

export default userRouter;
