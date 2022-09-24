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

export const see = async (req, res) => {
    const { id } = req.params;
    const board = await Board.findOne({_id : id});
    console.log(board);
    return res.render("see", {pageTitle:"See", board});
}

export const deleteBoard = async (req, res) => {
    const {id} = req.params;
    const {user:{_id}} = req.session;

    const board = await Board.findById(id);
    if(!board){
        return res.status(404).render("404", {pageTitle:"글을 찾을 수 없습니다."});
    }

    if(String(board.owner) !== String(_id)){
        return res.status(403).redirect("/");
    }
    await Board.findByIdAndDelete(id);
    
    await User.updateOne(
        { _id : _id},
        {$pull : {"boards" : id}}
    );

    return res.redirect("/");
}