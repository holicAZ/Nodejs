import app from "./app";
import dotenv from "dotenv";
import db from "./db"; // db연동

dotenv.config(); // dotenv의 사용법
const port = process.env.port;

app.listen(port, () => {
  // 서버를 여는부분
  console.log(`Example app listening at http://localhost:${port}`);
});
