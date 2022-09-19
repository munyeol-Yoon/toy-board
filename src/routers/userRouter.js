import express from "express";
import {
    getEdit, 
    logout, 
    postEdit, 
    startGithubLogin, 
    finishGithubLogin,
    startKakaoLogin,
    finishKakaoLogin,
    myProfile,
    getChangePassword,
    postChangePassword
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get("/myprofile", myProfile);
userRouter.route("/myprofile/password").get(getChangePassword).post(postChangePassword);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/kakao/start", startKakaoLogin);
userRouter.get("/kakao/finish", finishKakaoLogin);

export default userRouter;
