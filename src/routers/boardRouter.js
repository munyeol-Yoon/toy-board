import express from "express";
import { getWrite, postWrite, see, deleteBoard} from "../controllers/boardController";

const boardRouter = express.Router();

boardRouter.route("/write").get(getWrite).post(postWrite);
boardRouter.get("/:id", see);
boardRouter.get("/:id/delete", deleteBoard);

export default boardRouter;