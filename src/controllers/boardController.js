import Board from "../models/Board";


export const home = async (req, res) =>{
    const boards = await Board.find({});
    console.log(boards);
    return res.render("home", {pageTitle : "Home", boards});
}

export const getWrite = (req, res) =>{
    return res.render("writing", {pageTitle:"글쓰기"});
}

export const postWrite = (req, res) => {
    const {
        
    } = req;
}