import Comment from "../models/Comment"
import User from "../models/User"
import Post from "../models/Post"


export const comment = (req,res) => {
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

export const edit = (req,res)=>{
    var post = req.query.postId;
    var updateAt = Date.now();
    var text = req.body.text;
    Comment.findOneAndUpdate({_id:req.params.id}, {text:text}, {updateAt:updateAt}).exec();

    return res.redirect('/allpost/'+post);
}

export const del = (req,res) => {
    var post = req.query.postId;
    Comment.findOne({_id:req.param.id},function(err,comment){
        if(err) return err;

        comment.isDeleted = true;
        comment.save(function(err,comment){
            if(err) return res.json(err);

            return res.redirect('/allpost/'+post);
        });
    });
};

