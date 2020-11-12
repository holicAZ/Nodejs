import { nextTick } from "async";
import { response } from "express";
import User from "../models/User";
import userRouter from "../router/userRouter";
import bcrypt from "bcrypt";
var passport = require('../config/passport');


export const hc = (req, res) => {
  res.render("posts/index");
};

export const login = async(req, res) => {
  
  var flag = false;
  
  try{
    var point = 0;
    const userID = req.body.username;
    const userPW = req.body.password;

    const arr = await User.find();
    for(var i=0;i<arr.length;i++){ // 로그인 먼저, id check
      if (arr[i]["id"] == userID) {
        flag = true;
        point = i;   
        break;
      }
      else{
        flag = false;
      }  
    }

    console.log(arr[point]["id"]);
    console.log(arr[point]["pw"]);
    console.log(userID);
    console.log(userPW);
    console.log(flag);
    
    if(flag){
      if(passport.authenticate('local-login')){ // 로그인 완료 => 홈 화면
        console.log("1실행");
        res.redirect("/");
      }
      else{ // 로그인 실패 => 다시 로그인 화면 (pw mismatch)
        console.log("2실행");
        res.redirect("/getLogin");  
      }
    }

    else if(!flag){ // 로그인 실패 => 다시 로그인 화면 (id mismatch)
      console.log("3실행");
      res.redirect("/getLogin");
    }
  }
  catch(error){
      console.log(error);
  }
};

export const logout = (req, res) => {
  res.send("logout");
};

export const getLogin = (req,res) =>{
  res.render("posts/loginpage");
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
