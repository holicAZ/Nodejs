import express from "express";

import routes from "../routes";
import {
  GETuser,
  mypage,
  Pprofile,
} from "../controller/userController";
const userRouter = express.Router();

userRouter.get(routes.home, GETuser);
userRouter.get(routes.mypage, mypage);
userRouter.get(routes.profile, Pprofile);


export default userRouter;
