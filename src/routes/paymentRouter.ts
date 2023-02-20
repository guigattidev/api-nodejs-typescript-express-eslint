import { Router } from "express";

import { parametersExists } from "../middlewares/checkParameter.js";
import {
    paymentBalance,
    paymentEvent,
    paymentReset,
} from "../controllers/paymentController.js";

const userRouter: Router = Router();

// The endpoints for the application
userRouter.post("/reset", paymentReset);
userRouter.post("/event", paymentEvent);
userRouter.get("/balance", parametersExists, paymentBalance);

export default userRouter;
