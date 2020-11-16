import { nextTick } from "async";
import { response } from "express";
import User from "../models/User";
import userRouter from "../router/userRouter";
import bcrypt from "bcrypt";
import { model } from "mongoose";
var passport = require('../config/passport');
import session from "express-session";
var isLogined = false;

export const hc = (req, res) => {
  console.log("hc");
  console.log(req.isAuthenticated());
  if(req.isAuthenticated()){ // 로그인 상태 확인
    isLogined = true;
  }else{
    isLogined = false;
  }
  var username = req.flash('username')[0];
  var errors = req.flash('errors')[0]||{};
  console.log(isLogined);
  res.render('posts/index',{
    isLogined : isLogined // 전달을 어떻게 할것인가?
  });
  /*
  if(req.session.logined){
    console.log("login");
    res.render("posts/index", {user_id : req.session.user_id, flag : req.session.logined});
  }
  else{
    res.render("posts/index", null);
  }
  */
};

export const login = passport.authenticate('local',{
  successRedirect:'/',
  failureRedirect:'/getLogin',
  failureFlash:true,
});
  

export const logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

export const getLogin = (req,res) =>{
  res.render('posts/loginpage',{isLogined:isLogined});
}
export const getJoin = (req,res) => {
  res.render("posts/joinpage");
}

export const pidcheck = async (req,res)=>{
  const userID = req.body.id;
  try{ 
  var flag = false;
    
    const arr = await User.find();
    console.log(userID);
    for (var i = 0; i < arr.length; i++) {
      
      if (arr[i]["id"] == userID) {
        res.send(true);
        return;
      }
    }

    res.send(false);
    }
    catch(error){
      console.log(error);
    }
    return;
};

export const join = async (req, res) => {
  const userName = req.body.name;
  const userID = req.body.id;
  const userPW = req.body.pw;
  const userpn = req.body.phoneNumber;

  const user = new User({
    name : userName,
    id : userID,
    pw : userPW,
    phoneNumber : userpn,
  });

  user.save();
  res.redirect("/");
  };


export const PfindID = (req, res) => {
  res.send("findID");
};

export const PfindPW = (req, res) => {
  res.send("findPW");
};
