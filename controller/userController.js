import Post from "../models/Post";
export const GETuser = (req, res) => {
  res.send("user");
};

export const Gmypage = (req, res) => {
  res.send("mypage");
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
