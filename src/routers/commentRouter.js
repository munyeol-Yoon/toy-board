import express from "express";
import { createComment, deleteComment } from "../controllers/boardController";

const commentRouter = express.Router();

commentRouter.post("/boards/:id([0-9a-f]{24}/comments)", createComment);
commentRouter.delete("/comments/:id([0-9a-f]{24})", deleteComment);

export default commentRouter;
