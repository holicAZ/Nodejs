import userRouter from "../router/userRouter";
import bcrypt from "bcrypt";
import { reject } from "async";
import { resolveInclude } from "ejs";

var mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  id: String,
  pw: {type:String, select:false},
  phoneNumber: String,
});

UserSchema.pre('save', function(next){
  var user = this;
  if(user.isModified('pw')){
    return bcrypt.genSalt(10,(err,salt) => {
      if(err) return next(err);
      return bcrypt.hash(user.pw, salt, (err,hash)=>{
        if(err) return next(err);
        user.pw = hash;
        return next();
      });
    });
  } else {
    return next();
  }
});


// UserSchema.methods.authenticate = function(password){
//   var user = this;
//   var ret;
//   new Promise((resolve,reject)=>{
//     bcrypt.compare(password,user.pw,(err,res)=>{
//       if(err) reject(err)
//       else resolve(res);
//     });
//   });
// }


const User = mongoose.model("User", UserSchema);

module.exports = User;
