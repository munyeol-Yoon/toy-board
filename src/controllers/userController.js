import bcrypt from "bcrypt";
import { urlencoded } from "express";
import fetch from "node-fetch";
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
    const user = await User.findOne({username, github:false});
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
    req.session.destroy();
    return res.redirect("/");
}

export const getEdit = (req, res) => {
    return res.render("edit", {pageTitle:"회원정보변경"});
}

export const postEdit = (req, res) => {
    return res.send("postEdit");
}

export const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id : process.env.GH_CLIENT,
        allow_signup: false,
        scope: "read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
}

export const finishGithubLogin = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id:process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code : req.query.code
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await (
        await fetch(finalUrl, {
        method:"POST",
        headers:{
            Accept:"application/json",
        },
    })).json();
    if("access_token" in tokenRequest){
        const {access_token} = tokenRequest;
        const apiUrl = "https://api.github.com";
        const userData = await (
            await fetch(`${apiUrl}/user`, {
                headers:{
                    Authorization:`token ${access_token}`,
                },
            })
        ).json();
        console.log(userData);
        const emailData = await (
            await fetch(`${apiUrl}/user/emails`, {
                headers:{
                    Authorization:`token ${access_token}`,
                },
            })
        ).json();
        console.log(emailData);
        const emailObj = emailData.find(
            (email) => email.primary === true && email.verified === true
        );
        if(!emailObj){
            return res.redirect("/login");
        }
        let user = await User.findOne({email : emailObj.email});
        if(!user){
            const user = await User.create({
                name : userData.name,
                username : userData.login,
                email: emailObj.email,
                password:"",
                location: userData.location,
                github : true
            });
        }
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
    }
    else{
        return redirect("/login");
    }
};

export const startKakaoLogin = (req, res) =>{
    const baseUrl = "https://kauth.kakao.com/oauth/authorize";
    const config ={
        client_id:process.env.KA_CLIENT,
        redirect_uri:process.env.KA_CALLBACK,
        response_type:"code"
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
}

export const finishKakaoLogin = async (req, res) => {
    const baseUrl = "https://kauth.kakao.com/oauth/token";
    const apiUrl = "https://kapi.kakao.com/v2/user/me";
    const config ={
        client_id:process.env.KA_CLIENT,
        client_secret:process.env.KA_SECRET,
        grant_type:"authorization_code",
        redirect_uri:process.env.KA_CALLBACK,
        code:req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await (
        await fetch(finalUrl, {
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
        })
    ).json();

    if("access_token" in tokenRequest) {
        const {access_token} = tokenRequest;
        const userRequest = await (
            await fetch(apiUrl, {
                headers:{
                    Authorization:`Bearer ${access_token}`,
                    "Content-type":"application/json",
                },
            })
        ).json();
        console.log(userRequest);
        console.log(userRequest.properties);
        
        const userNickname = userRequest.properties.nickname;

        const user = User.create({
            email:userNickname,
            name:userNickname,
            username:userNickname,
            password:"",
            kakao:true
        });

        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
    }
    else{
        return res.redirect("/login");
    }
}