import express from "express"
import{
    comment,
} from "../controller/cmtcontroller"
import Post from "../models/Post";
import routes from "../routes";

const comments = express.Router();

function checkPostId(req, res, next){
    Post.findOne({_id:req.query.postId}, function(err,post){
        if(err) return res.json(err);
        console.log("postid = ");
        console.log(post);
        res.locals.post = post;
        next();
    });
}

comments.post(routes.home,checkPostId, comment);

export default comments;