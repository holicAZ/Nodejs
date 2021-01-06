var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    post:{type:mongoose.Schema.Types.ObjectId, ref:'Post', required:true},
    author:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    parentComment:{type:mongoose.Schema.Types.ObjectId, ref:'comment'},
    text:{type:String, required:[true, 'text is required!']},
    isDeleted:{type:Boolean},
    createAt:{type:Date, default:Date.now},
    updatedAt:{type:Date},
},{
    toObject:{virtuals:true}
});

commentSchema.virtual('childComments')
.get(function(){ return this._childComments; })
.set(function(value){this._childComments=value; });

var Comment = mongoose.model('comment',commentSchema);

export default Comment;