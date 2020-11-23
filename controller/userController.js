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

export const Pposting = async (req, res) => {
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

  const postTitle = req.body.title;
  const postBody = req.body.body;
  const time = getCurrDate();
  const newposting = await Post.create({
    title: postTitle,
    body: postBody,
    createAt: time,
  });
  res.send("게시글 작성 완료");
};
