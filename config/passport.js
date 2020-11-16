var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy; // 1
var User = require('../models/User');

// serialize & deserialize User // 2
passport.serializeUser((user, done)=> { //로그인 성공 시 실행
  console.log(user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done)=> { //로그인 요청이 들어오면 실행
    done(null, id);
});

// local strategy // 3
passport.use(
  new LocalStrategy({
      usernameField : 'username', // 3-1
      passwordField : 'password', // 3-1
      passReqToCallback : true
    },
    (req, username, password, done) => { // 3-2
        console.log("3-2");
        User.findOne({id:username},(err,user) => 
      {   if (err) return done(err);

          if (user && user.hashpw(password)){ // 3-3
            return done(null, user);
          }
          else {
            req.flash('username', username);
            req.flash('errors', {login:'The username or password is incorrect.'});
            return done(null, false);
          }
        });
    }
  )
);

module.exports = passport;