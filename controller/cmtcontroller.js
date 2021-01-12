import Comment from "../models/Comment"
import User from "../models/User"
import Post from "../models/Post"


export const makecomment = (req,res) => {
    var post = req.query.postId;
    var author = req.user._id;
    var text = req.body.text;
    console.log(text);
    console.log(post);
    console.log(author);
    const com = new Comment({
        text:text,
        post:post,
        author:author
    });
    
    com.save();
    return res.redirect('/allpost/'+post);
}

export const commentedit = (req,res)=>{
    console.log("수정");
    var post = req.query.postId;
    
    req.body.updateAt = Date.now();
    Comment.findOneAndUpdate({_id:req.params.id}, req.body, {runValidators:true},function(err,comment){
        return res.redirect('/allpost/'+post);
    });

    
}

export const del = (req,res) => {
    var post = req.query.postId;
    Comment.findOne({_id:req.params.id},function(err,comment){
        if(err) return err;

        comment.isDeleted = true;
        comment.save(function(err,comment){
            if(err) return res.json(err);

            return res.redirect('/allpost/'+post);
        });
    });
};

