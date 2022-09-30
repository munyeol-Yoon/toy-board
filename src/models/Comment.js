import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  ownerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  username: { type: String, required: true },
  board: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Board" },
  createdAt: {
    type: String,
    required: true,
    default: function () {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let hours = date.getHours();
      let min = date.getMinutes();
      let sec = date.getSeconds();

      let today = `${year}/${month}/${day} ${hours}:${min}:${sec}`;

      return today;
    },
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
