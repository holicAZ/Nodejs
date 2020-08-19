import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String },
  body: { type: String },
  createAt: { type: Date },
  updateAt: Date,
});

const Postmodel = mongoose.model("Post", PostSchema);

export default Postmodel;
