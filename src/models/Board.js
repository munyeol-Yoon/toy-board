import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 80 },
  maintext: { type: String, required: true },
  username: { type: String, required: true },
  owner: { type: String, required: true },
  views: { type: Number, default: 0 },
  time: { type: String },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  commentsCnt: { type: Number, default: 0 },
});

const Board = mongoose.model("Board", boardSchema);

export default Board;
