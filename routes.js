const HOME = "/";
const LOGIN = "/login";
const JOIN = "/join";
const LOGOUT = "/logout";
const FINDID = "/findID";
const FINDPW = "/findPW";

const USER = "/user";
const ID = "/:id";
const MYPAGE = "/:id/mypage";
const PROFILE = "/:id/profile";
const POSTING = "/:id/posting";

const PHOTO = "/photo";
const ASIA = "/asia";
const KOREA = "/asia/korea";
const SEOUL = "/asia/korea/seoul";
const BUSAN = "/asia/korea/busan";
const JEJU = "/asia/korea/jeju";

const routes = {
  home: HOME,
  login: LOGIN,
  join: JOIN,
  logout: LOGOUT,
  findID: FINDID,
  findPW: FINDPW,
  user: USER,
  id: ID,
  mypage: MYPAGE,
  profile: PROFILE,
  posting: POSTING,
  photo: PHOTO,
  asia: ASIA,
  korea: KOREA,
  seoul: SEOUL,
  busan: BUSAN,
  jeju: JEJU,
};

export default routes;
