import Comment from "../models/Comment"
import User from "../models/User"
import Post from "../models/Post"
import util from "../util"

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

