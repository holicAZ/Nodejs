import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

import "./models/User";
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connect to DB");
const handleError = (error) =>
  console.log(`❌ Error on DB connection ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
