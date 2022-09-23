import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
    title : {type:String, required:true, maxLength:80},
    maintext : {type:String, required:true},
    username : {type:String, required:true},
    owner : {type:String, required:true}
});

const Board = mongoose.model("Board", boardSchema);

export default Board;