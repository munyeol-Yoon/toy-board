import bcrypt from "bcrypt";
import User from "../models/User";

export const getJoin = (req, res) => {
    return res.render("join", {pageTitle:"Join"});
};
export const postJoin = async (req, res) => {
    const {email, username, name, password, password2, location} = req.body;
    
    if(password !== password2){
        return res.status(400).render("join", {pageTitle:"Join", errorMessage:"비밀번호가 틀려요 😓"})
    }
    const existsEmail = await User.exists({$or : [{email}]});
    if(existsEmail){
        return res.status(400).render("join", {pageTitle:"Join", errorMessage:"이미 같은 이메일이 존재해요 😓"})
    }
    const existsUsername = await User.exists({$or : [{username}]});
    if(existsUsername){
        return res.status(400).render("join", {pageTitle:"Join", errorMessage:"이미 같은 아이디가 존재해요 😓"})
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
        console.log(req.body);
        return res.redirect("/login");
    }catch(error){
        return res.status(400).render("join", {pageTitle:"400", errorMessage:error._message});
    }
}

export const getLogin = (req, res) => {
    return res.render("login", {pageTitle:"Login"});
}

export const postLogin = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).render("login", {pageTitle:"Login", errorMessage:"아이디가 존재하지 않아요 😓"});
    }
    const compare = await bcrypt.compare(password, user.password);
    if(!compare){
        return res.status(400).render("login", {pageTitle:"Login", errorMessage:"비밀번호가 틀렸어요 😓"});
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
}

export const logout = (req, res) => {
    req.session.loggedIn = false;
    req.session.user = null;
    return res.redirect("/");
}

export const getEdit = (req, res) => {
    return res.render("edit", {pageTitle:"회원정보변경"});
}

export const postEdit = (req, res) => {
    
}