import Post from "../models/Post";
export const GETuser = (req, res) => {
  console.log(req.isLogined);
  if(req.isLogined)
    res.send("true");
  else
    res.send("false");
};
var isLogined;
export const mypage = (req, res) => {
  var isLogined = req.isAuthenticated();
  console.log("user id :",req.user.id);
  console.log("user name :",req.user.name);
  console.log("user session :",req.user);
  console.log(isLogined);
  var user_id = req.user.id;
  var user_name = req.user.name;
  res.render('posts/mypage',{
    user_id:user_id,
    isLogined:isLogined,
    user_name:user_name});
};

export const Pprofile = (req, res) => {
  res.send("profile");
  //post
};


