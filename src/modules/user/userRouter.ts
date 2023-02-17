import { Router } from "express";

import {
    userIndex,
    userCreate,
    userShow,
    userDelete,
} from "./userController.js";

export const userRouter = Router();

userRouter.get("/", userIndex);
userRouter.post("/", userCreate);
userRouter.get("/:user_id", userShow);
userRouter.delete("/:user_id", userDelete);
