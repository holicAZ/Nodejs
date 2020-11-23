import userRouter from "../router/userRouter";
import bcrypt, { compareSync } from "bcrypt";

var mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  id: String,
  pw: {type:String, select:false},
  phoneNumber: String,
});

UserSchema.pre("save", function(next){
  var user = this;
  if(user.isModified("pw")){
    bcrypt.genSalt(10,(err,salt) => {
      if(err) return next(err);
      bcrypt.hash(user.pw, salt, (err,hash)=>{
        if(err) return next(err);
        user.pw = hash;
        next();
      });
    });
  } else {
    next();
  }
});


UserSchema.methods.hashpw = function(password){
  var user = this;
  return bcrypt.compare(password,user.password);
};


const User = mongoose.model("User", UserSchema);

module.exports = User;
