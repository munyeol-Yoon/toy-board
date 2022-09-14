import bcrypt from "bcrypt";
import User from "../models/User";

export const getJoin = (req, res) => {
    return res.render("join", {pageTitle:"Join"});
};
export const postJoin = async (req, res) => {
    const {email, username, name, password, password2, location} = req.body;
    
    if(password !== password2){
        return res.status(400).render("join", {pageTitle:"Join", errorMessage:"비밀번호가 틀립니다."})
    }
    const existsEmail = await User.exists({$or : [{email}]});
    if(existsEmail){
        return res.status(400).render("join", {pageTitle:"Join", errorMessage:"이미 같은 이메일이 존재합니다."})
    }
    const existsUsername = await User.exists({$or : [{username}]});
    if(existsUsername){
        return res.status(400).render("join", {pageTitle:"Join", errorMessage:"이미 같은 아이디가 존재합니다."})
    }
    try{
        await User.create({
            email,
            username,
            name,
            password,
            password2,
            location,
        });
        return res.redirect("/login");
    }catch(error){
        return res.status(400).render("join", {pageTitle:"400", errorMessage:error._message});
    }
}

export const getLogin = (req, res) => {
    return res.render("login", {pageTitle:"Login"});
}

export const postLogin = (req, res) => {
    return res.send("POSTLOGIN");
}