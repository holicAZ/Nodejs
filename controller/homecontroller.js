import { find, findSeries, nextTick } from "async";
import { response } from "express";
import User from "../models/User";
import File from "../models/File";
import Post from "../models/Post"
import userRouter from "../router/userRouter";
import bcrypt from "bcrypt";
import { model } from "mongoose";
var passport = require('../config/passport');
import session from "express-session";
import multer from 'multer';
var isLogined;
var fs = require('fs');
var path = require('path');

export const hc = (req, res) => {
  console.log("hc");
  console.log(req.isAuthenticated());
  if(req.isAuthenticated()){ // 로그인 상태 확인
    isLogined = true;
  }else{
    isLogined = false;
  }

  console.log(isLogined);
  res.render('posts/index',{
    isLogined : isLogined // 전달을 어떻게 할것인가?
  });
};

export const login = passport.authenticate('local',{
  successRedirect:'/',
  failureRedirect:'/getLogin',
  failureFlash:true,
});
  

export const logout = (req, res) => {
  req.session.destroy(function(err){
    res.clearCookie('sid');
    res.redirect('/');
  });

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

export const allPost = async(req,res) => {
    var image =[];
    var arr = await File.find({});
    for(var i=0;i<arr.length;i++){
      var filePath = path.join('upload_image',arr[i].serverFileName);
      image.push(filePath);
    }
    res.render('posts/allpost',{
      isLogined:isLogined,
      image:image,
    })  
}

export const postingform = (req,res) =>{
  if(isLogined){
  
  res.render("posts/newpost",{
    isLogined:isLogined,
  });
}
else{
  res.redirect('/getLogin');
}
}

export const newpost =  async (req, res) => {
  var attachment = req.file? await File.createNewInstance(req.file,req.user._id):undefined;
  req.body.upload = attachment;
  req.body.author = req.user._id;


  function getCurrDate() {
    // 한국 시간을 맞추기 위한 함수
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var today = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();
    return new Date(
      Date.UTC(year, month, today, hours, minutes, seconds, milliseconds)
    );
  }

  const postBody = req.body.comment;
  const time = getCurrDate();
  
  const post= new Post({
    body: postBody,
    createAt: time,
    author : req.user._id,
    attachment : attachment,
  });

  if(attachment){
    console.log("이미지 및 게시글 저장완료");
    post.save();
    attachment.postId = post._id;
    console.log(post);
    console.log(attachment);
    console.log(post._id);
    attachment.save();
  }
  else{
    console.log("이미지 없이 저장완료")
    post.save();
  }
  
  res.redirect('/allpost');
  };
