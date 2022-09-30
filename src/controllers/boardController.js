import Board from "../models/Board";
import User from "../models/User";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  const boards = await Board.find({});
  console.log(boards);
  return res.render("home", { pageTitle: "Home", boards });
};

export const getWrite = (req, res) => {
  return res.render("writing", { pageTitle: "글쓰기" });
};

export const postWrite = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { title, maintext } = req.body;
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const time = `${year}년${month}월${date}일  ${hours}:${minutes}`;
  if (!title) {
    return res.status(400).render("writing", {
      pageTitle: "글쓰기",
      errorMessage: "제목을 써야합니다.",
    });
  }
  if (!maintext) {
    return res.status(400).render("writing", {
      pageTitle: "글쓰기",
      errorMessage: "본문을 써야합니다.",
    });
  }
  try {
    const user = await User.findById(_id);
    const newBoard = await Board.create({
      title,
      maintext,
      owner: _id,
      username: user.username,
      time,
    });
    user.boards.push(newBoard._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    return res.render("writing", {
      pageTitle: "글쓰기",
      errorMessage: "Error",
    });
  }
};

export const see = async (req, res) => {
  const { id } = req.params;
  const board = await Board.findOne({ _id: id }).populate("comments");
  console.log(board);
  await Board.updateOne({ _id: id }, { $inc: { views: 1 } });

  return res.render("see", { pageTitle: "See", board });
};

export const deleteBoard = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;

  const board = await Board.findById(id);
  if (!board) {
    return res
      .status(404)
      .render("404", { pageTitle: "글을 찾을 수 없습니다." });
  }

  if (String(board.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Board.findByIdAndDelete(id);

  await User.updateOne({ _id: _id }, { $pull: { boards: id } });

  return res.redirect("/");
};

export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;
  const board = await Board.findById(id).populate("comments");
  console.log("testing: " + id);
  console.log("user testing : " + user);

  const newComment = await Comment.create({
    text,
    ownerID: user._id,
    username: board.username,
    board: id,
  });

  console.log("방금적은거 > " + text);
  board.comments.push(newComment._id);
  board.save();

  await Board.updateOne({ _id: id }, { $inc: { commentsCnt: 1 } });

  return res.redirect(`/boards/${id}`);
};

export const deleteComment = async (req, res) => {
  return res.send("test");
};
