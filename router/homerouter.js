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
  result
} from "../controller/homecontroller";
import routes from "../routes";

const homeRouter = express.Router();

homeRouter.get(routes.home, hc);
homeRouter.post(routes.join, join, getLogin);
homeRouter.post(routes.findID, PfindID);
homeRouter.post(routes.findPW, PfindPW);
homeRouter.post(routes.login, login);
homeRouter.get(routes.login, login);
homeRouter.post(routes.idcheck, pidcheck);
homeRouter.get(routes.getJoin, getJoin);
homeRouter.get(routes.getLogin, getLogin);
homeRouter.get(routes.logout, logout);
export default homeRouter;
