import express from "express";
import { getWrite, postWrite } from "../controllers/boardController";

const boardRouter = express.Router();

boardRouter.route("/write").get(getWrite).post(postWrite);

export default boardRouter;