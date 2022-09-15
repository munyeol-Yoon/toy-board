import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email : {type:String, required:true, unique: true},
    username : {type:String, required:true, unique: true},
    name : {type:String, required:true},
    password : {type:String, required:true, trim:true },
    location: String,
});

userSchema.pre("save", async function(){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 7);
        console.log(this.password); 
    }
});

const User = mongoose.model("User", userSchema);

export default User;