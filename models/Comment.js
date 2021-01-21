var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    post:{type:mongoose.Schema.Types.ObjectId, ref:'Post', required:true},
    author:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    parentComment:{type:mongoose.Schema.Types.ObjectId, ref:'Comment'},
    text:{type:String, required:[true, 'text is required!']},
    isDeleted:{type:Boolean},
    createAt:{type:Date, default:Date.now},
    updatedAt:{type:Date},
},{
    toObject:{virtuals:true}
});

var Comment = mongoose.model('Comment',commentSchema);

commentSchema.virtual('childComments')
.get(function(){ return this._childComments; })
.set(function(value){this._childComments=value; });



export default Comment;