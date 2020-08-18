import User from "../models/User";
export const hc = (req, res) => {
  res.send("Hello World");
};

export const login = (req, res) => {
  res.send("login");
};

export const logout = (req, res) => {
  res.send("logout");
};

export const join = async (req, res) => {
  const userID = req.body.id;
  const userPW = req.body.pw;
  const userpn = req.body.phoneNumber;

  const arr = await User.find();
  var msg;
  var flag = true;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]["id"] == userID || userID.length < 5) {
      flag = false;
      msg = "id가 5글자 미만 이거나 이미 있는 id";
      break;
    }
    if (userPW.length <= 6) {
      flag = false;
      msg = "pw가 6자 이하입니다.";
      break;
    }
    if (userpn.length < 11 || userpn == null) {
      flag = false;
      msg = "올바른 형식의 전화번호를 입력하세요";
      break;
    }
  }
  if (flag) {
    const newuser = await User.create({
      id: userID,
      pw: userPW,
      phoneNumber: userpn,
    });

    res.send("가입 성공");
  } else {
    res.send(msg);
  }
};

export const PfindID = (req, res) => {
  res.send("findID");
};

export const PfindPW = (req, res) => {
  res.send("findPW");
};
