import express from "express"
import{
    makecomment,
    commentedit,
    del
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

const noPermission = function(req, res){
    req.flash('errors', {login:"You don't have permission"});
    req.logout();
    res.redirect('/login');
  }

async function checkPermission(req,res){
   var comment = await Comment.findOne({_id:req.params.id})
   .exec()
    console.log(req.params.id);
    if(err) return res.json(err);
    if(comment.autor != req.user.id) return noPermission(req,res);   
   
};

comments.post(routes.home,checkPostId, makecomment);
comments.post(routes.commentedit,commentedit);
comments.delete(routes.commentdelete,checkPermission,checkPostId,del);

export default comments;