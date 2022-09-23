import Board from "../models/Board";
import User from "../models/User";


export const home = async (req, res) =>{
    const boards = await Board.find({});
    console.log(boards);
    return res.render("home", {pageTitle : "Home", boards});
}

export const getWrite = (req, res) =>{
    return res.render("writing", {pageTitle:"글쓰기"});
}

export const postWrite = async (req, res) => {
    const {
        user:{_id}
    } = req.session;
    const {title, maintext} = req.body;
    if(!title){
        return res.status(400).render("writing", {pageTitle:"글쓰기", errorMessage:"제목을 써야합니다."});
    }
    if(!maintext){
        return res.status(400).render("writing", {pageTitle:"글쓰기", errorMessage:"본문을 써야합니다."});
    }
    try{
        const user = await User.findById(_id);
        const newBoard = await Board.create({
            title,
            maintext,
            owner: _id,
            username:user.username
        });
        user.boards.push(newBoard._id);
        user.save();
        return res.redirect("/");
    }
    catch(error){
        return res.render("writing", {pageTitle:"글쓰기", errorMessage:"Error"});
    }
}