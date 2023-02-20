import { Router } from "express";

import { parametersExists } from "../middlewares/checkParameter.js";
import {
    paymentBalance,
    paymentEvent,
    paymentReset,
} from "../controllers/paymentController.js";

const userRouter: Router = Router();

userRouter.post("/reset", paymentReset);
userRouter.get("/balance", parametersExists, paymentBalance);
userRouter.post("/event", paymentEvent);

export default userRouter;
