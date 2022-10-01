import express from "express";
import {
  getWrite,
  postWrite,
  see,
  deleteBoard,
} from "../controllers/boardController";
import { protectorMiddleware } from "../middlewares";

const boardRouter = express.Router();

boardRouter
  .route("/write")
  .all(protectorMiddleware)
  .get(getWrite)
  .post(postWrite);
boardRouter.get("/:id([0-9a-f]{24})/delete", protectorMiddleware, deleteBoard);
boardRouter.get("/:id([0-9a-f]{24})", see);

export default boardRouter;
