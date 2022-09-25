import express from "express";
import {
  getWrite,
  postWrite,
  see,
  deleteBoard,
} from "../controllers/boardController";

const boardRouter = express.Router();

boardRouter.route("/write").get(getWrite).post(postWrite);
boardRouter.get("/:id([0-9a-f]{24})", see);
boardRouter.get("/:id([0-9a-f]{24})/delete", deleteBoard);

export default boardRouter;
