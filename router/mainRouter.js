import express from "express";

import routes from "../routes";
import {
  GETphoto,
  GETasia,
  GETseoul,
  GETkorea,
  GETbusan,
  GETjeju,
} from "../controller/mainController";
const mainRouter = express.Router();

mainRouter.get(routes.home, GETphoto);
mainRouter.get(routes.asia, GETasia);
mainRouter.get(routes.korea, GETkorea);
mainRouter.get(routes.seoul, GETseoul);
mainRouter.get(routes.busan, GETbusan);
mainRouter.get(routes.jeju, GETjeju);
export default mainRouter;
