const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');

//tell to passport to use new strategy
passport.use(new googleStrategy({
    clientID:"884120867378-virpuvphaf8uhm1d7kkfjfjp6q45r3n0.apps.googleusercontent.com",
    clientSecret: "bbfu7BiNKTpdiwitACmeI2Ud",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
},
function(accessToken, refreshToken, profile, done){
    //find a user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log('error in google startegy', err);
            return;
        }
        console.log(accessToken, refreshToken);
        console.log(profile);
        //if found set this user as req.user    (req.user means signin user)
        if(user){
            return done(null, user);
        }else{
            //if not found. create the user and set it as req.user  (req.user means signin user)
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function(err, user){
                if(err){
                    console.log('error in google startegy', err);
                    return;
                }

                return done(null, user);
            });
        }
    });
}
));

module.exports = passport;