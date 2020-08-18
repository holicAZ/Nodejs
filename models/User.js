import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: String,
  pw: String,
  phoneNumber: String,
});

const model = mongoose.model("User", UserSchema);

export default model;
