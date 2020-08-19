import express from "express";
import routes from "../routes";
import {
  Gmypage,
  GETuser,
  Pposting,
  Pprofile,
} from "../controller/userController";

const userRouter = express.Router();

userRouter.get(routes.home, GETuser);
userRouter.get(routes.mypage, Gmypage);
userRouter.post(routes.posting, Pposting);
userRouter.get(routes.profile, Pprofile);

export default userRouter;
