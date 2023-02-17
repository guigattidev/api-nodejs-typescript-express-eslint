import { Router } from "express";

import {
    userIndex,
    userCreate,
    userShow,
    userDelete,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", userIndex);
userRouter.post("/", userCreate);
userRouter.get("/:user_id", userShow);
userRouter.delete("/:user_id", userDelete);

export default userRouter;
