import express from "express";
import {getEdit, logout, postEdit} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.route("/edit").get(getEdit).post(postEdit);

export default userRouter;
