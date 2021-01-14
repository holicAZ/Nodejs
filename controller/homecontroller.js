import { find, findSeries, nextTick } from "async";
import { response } from "express";
import User from "../models/User";
import File from "../models/File";
import Post from "../models/Post"
import Comment from "../models/Comment"
import userRouter from "../router/userRouter";
import bcrypt from "bcrypt";
import { model } from "mongoose";
var passport = require('../config/passport');
import session from "express-session";
import multer from 'multer';
import { render } from "ejs";
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

export const login = passport.authenticate('local-login',{
  successRedirect:'/',
  failureRedirect:'/getLogin',
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
  res.render("posts/joinpage",{isLogined:isLogined});
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
    var image =[]; // 이미지 불러올 경로를 담는 배열
    var linkpost =[]; // 이미지에 할당된 게시글 id값을 담을 배열
    var page = Math.max(1,parseInt(req.query.page));
    var limit = Math.max(1,parseInt(req.query.limit)); // 한 페이지에 담을 개체 수
    page = !isNaN(page)?page:1;
    limit = !isNaN(limit)?limit:9;

    var skip = (page-1)*limit; // n페이지에 시작하느 객체 번호
    var count = await File.countDocuments({}); // 객체 수
    var maxPage = Math.ceil(count/limit); // 마지막 페이지

    var arr = await File.find({})
    .skip(skip)
    .limit(limit);

    for(var i=0;i<arr.length;i++){
      var filePath = path.join('upload_image',arr[i].serverFileName);
      image.push(filePath);
      linkpost.push(arr[i].postId);
    }
    res.render('posts/allpost',{
      isLogined:isLogined,
      image:image,
      linkpost:linkpost,
      page:page,
      maxPage:maxPage,
      limit:limit
    })  
}

export const show = async (req,res) => {
  var userid;
  if(req.user==null){
    userid =null;
  }
  else{
    userid=req.user.id;
  }
  var comments = await Comment.find({post:req.params.id})
  .sort('createdAt')
  .populate({path:'author',select:'id'})
  
  await Post.findOne({_id:req.params.id})
  .populate('author','id') // author 부분의 _id 값을 객체화
  .populate('attachment','serverFileName originalFileName') // attachment 부분의 _id 값을 객체화 , 원하는 정보만 출력
  .exec((err,data) => {
  
    console.log(data);
    //console.log(img);
    var img = data.attachment.serverFileName;
    var filePath = path.join('upload_image',img);
    
    res.render('posts/show',{
      isLogined:isLogined,
      post:data,
      filePath:filePath,
      comments:comments,
      userid:userid
    })  

  });
 
};

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
    console.log("이미지 없이 저장완료");
    post.save();
  }
  
  res.redirect('/allpost');
  };

  
 