import express from "express";
import {
  hc,
  login,
  join,
  logout,
  PfindID,
  PfindPW,
} from "../controller/homecontroller";
import routes from "../routes";

const homeRouter = express.Router();

homeRouter.get(routes.home, hc);
homeRouter.post(routes.join, join);
homeRouter.post(routes.findID, PfindID);
homeRouter.post(routes.findPW, PfindPW);
homeRouter.post(routes.login, login);
homeRouter.get(routes.logout, logout);
export default homeRouter;
