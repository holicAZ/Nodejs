import mongoose from 'mongoose';

var fileSchema = mongoose.Schema({
    originalFileName:String,
    serverFileName:String,
    size:Number,
    uploadedBy:{type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    isDeleted:{type:Boolean,default:false},
    postId:{type:mongoose.Schema.Types.ObjectId,ref:'Post'},
});

var File = mongoose.model('file',fileSchema);

File.createNewInstance = async function(file, uploadedBy){
    return await File.create({
        originalFileName:file.originalname,
        serverFileName:file.filename,
        size:file.size,
        uploadedBy:uploadedBy,
    });
};

module.exports = File;