import express from "express";
import homeRouter from "./router/homerouter";
import { firstmiddle } from "./middlewares";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import routes from "./routes";
import userRouter from "./router/userRouter";
import mainRouter from "./router/mainRouter";

const app = express();

//db 연동을 위한 use
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes.home, firstmiddle, homeRouter); // 서버를 열었을때 라우팅
app.use(routes.user, userRouter);
app.use(routes.photo, mainRouter);
export default app;
