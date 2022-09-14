import Board from "../models/Board";


export const home = async (req, res) =>{
    const boards = await Board.find({});
    console.log(boards);
    return res.render("home", {pageTitle : "Home", boards});
}