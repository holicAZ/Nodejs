var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy; // 1
var User = require('../models/User');
var bcrypt = require('bcryptjs');

// serialize & deserialize User // 2
passport.serializeUser((user, done)=> { //로그인 성공 시 실행
  console.log("로그인 성공")
  console.log(user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done)=> { //로그인 요청이 들어오면 실행
  User.findOne({id:id},function(err,user){
    done(null,user);
  })
  
});


passport.use('local-login',
  new LocalStrategy({
      usernameField : 'username', // login form id name
      passwordField : 'password', // login form pw name
      passReqToCallback : true
    },
    function(req, username, password, done){ // 3-2
        console.log("3-2");
        User.findOne({id:username})
        .select('pw id')
        .exec( async function(err,user) 
        {
          if (err) return done(err);
          
          var checkhash = await bcrypt.compare(password,user.pw); // hash pw 비교함수
          console.log("user : ", user);
          console.log("user.authenticate : ", checkhash);

          if (user && checkhash){ // 3-3
            
            return done(null, user);
          }
          else {
            console.log('login false');
           // req.flash('username', username);
           // req.flash('errors', {login:'The username or password is incorrect.'});
            return done(null, false);
          }
        });
    }
  )
);

module.exports = passport;