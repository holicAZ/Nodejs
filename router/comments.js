import express from "express"
import{
    comment,
    edit,
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

function checkPermission(req,res,next){
    Comment.findOne({_id:req.params.id}, function(err,comment){
        if(err) return res.json(err);
        if(comment.autor != req.user.id) return noPermission(req,res);   
    });
};

comments.post(routes.home,checkPostId, comment);
comments.put(routes.commentedit,checkPermission,checkPostId, edit);
comments.delete(routes.commentdelete,checkPermission,checkPostId, del);

export default comments;