import { allPost } from "./controller/homecontroller";

const HOME = "/";
const LOGIN = "/login";
const JOIN = "/join";
const IDCHK = "/idcheck";
const LOGOUT = "/logout";
const FINDID = "/findID";
const FINDPW = "/findPW";
const GETJOIN = "/getJoin";
const GETLOGIN = "/getLogin";
const ALLPOST = "/allPost";
const SHOW = "/allpost/:id";
const POSTING = "/newpost";
const POSTINGFORM = "/postingform";

const USER = "/user";
const MYPAGE = "/mypage";
const PROFILE = "/profile";

const COMMENT = "/comment";
const COMMENTEDIT = "/comment/:id";
const COMMENTDELETE = "/comment/:id";

const routes = {
  home: HOME,
  login: LOGIN,
  join: JOIN,
  logout: LOGOUT,
  idcheck: IDCHK,
  getJoin : GETJOIN,
  getLogin : GETLOGIN,
  findID: FINDID,
  findPW: FINDPW,
  allPost:ALLPOST,
  show:SHOW,
  user: USER,
  mypage: MYPAGE,
  profile: PROFILE,
  newpost: POSTING,
  postingform:POSTINGFORM,
  comment:COMMENT,
  commentedit:COMMENTEDIT,
  commentdelete:COMMENTDELETE,
  };

export default routes;
