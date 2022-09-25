import express from "express";
import { createComment, deleteComment } from "../controllers/boardController";

const commentRouter = express.Router();

commentRouter.post("/boards/:id/comments", createComment);
commentRouter.delete(
  "/boards/:id([0-9a-f]{24})/comments/delete",
  deleteComment
);

export default commentRouter;
