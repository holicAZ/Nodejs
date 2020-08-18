import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
});

const model = mongoose.model("User", UserSchema);

export default model;
