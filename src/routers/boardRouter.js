import express from "express";
import { getWrite } from "../controllers/boardController";

const boardRouter = express.Router();

boardRouter.route("/write").get(getWrite);

export default boardRouter;