import userRouter from "../router/userRouter";
import bcrypt, { compareSync } from "bcrypt";

var mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  id: String,
  pw: String,
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

UserSchema.methods.authenticate = function(password){
  var user = this;
  return bcrypt/compareSync(password,user.pw);
};

const model = mongoose.model("User", UserSchema);

export default model;
