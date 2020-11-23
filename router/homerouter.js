import express from "express";
import {
  hc,
  login,
  join,
  logout,
  PfindID,
  PfindPW,
  pidcheck,
  getJoin,
  getLogin,
  allPost,
  newpost,
  postingform,
} from "../controller/homecontroller";
import routes from "../routes";
import multer from 'multer';
var uploadfile = multer({dest:'upload_image/'});

const homeRouter = express.Router();

homeRouter.get(routes.home, hc);
homeRouter.post(routes.join, join);
homeRouter.post(routes.findID, PfindID);
homeRouter.post(routes.findPW, PfindPW);
homeRouter.post(routes.login, login);
homeRouter.post(routes.idcheck, pidcheck);
homeRouter.get(routes.getJoin, getJoin);
homeRouter.get(routes.getLogin, getLogin);
homeRouter.get(routes.logout, logout);
homeRouter.get(routes.allPost, allPost);
homeRouter.post(routes.newpost,uploadfile.single('upload') ,newpost);
homeRouter.get(routes.postingform,postingform);
export default homeRouter;
