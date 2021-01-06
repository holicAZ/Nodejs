import express from "express";
import homeRouter from "./router/homerouter";
import comments from "./router/comments"
import { firstmiddle } from "./middlewares";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import methodoverride from "method-override";
import routes from "./routes";
import userRouter from "./router/userRouter";
import flash from "connect-flash";
import util from "./util"

const session = require("express-session");
var passport = require("./config/passport");
const app = express();

app.use(
  session({
    key: "sid", // 세션의 키값
    secret: "secret", // 세션의 비밀 키 (암호화)
    resave: false, // 세션을 항상 저장? false
    saveUninitialized: true, // 세션을 uninitialize 로 저장
    cookie: {
      maxAge: 24000 * 60 * 60,
      secure: false
    },
  })
);

//db 연동을 위한 use

const path = require('path');
app.use('/views', express.static(path.join(__dirname,'views')))
app.use('*/node_modules', express.static(path.join(__dirname,'/node_modules')));
app.use('*/public',express.static(path.join(__dirname,'/public')));
app.use('/upload_image',express.static(path.join(__dirname,'/upload_image')));

app.set("view engine", "ejs");
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodoverride("_method"));



app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(firstmiddle);
app.use(routes.home, firstmiddle,util.getPostQueryString, homeRouter); // 서버를 열었을때 라우팅
app.use(routes.user, firstmiddle, userRouter);
app.use(routes.comment,util.getPostQueryString, comments);


export default app;
