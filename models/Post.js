import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  body: { type: String },
  author:{type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
  numId:{type:Number},
  attachment:{type:mongoose.Schema.Types.ObjectId, ref:'File',required:true},
  createAt: { type: Date, default:Date.now},
  updateAt: Date,
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
