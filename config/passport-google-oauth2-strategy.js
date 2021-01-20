const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');

const env = require('./environment');

//tell to passport to use new strategy
passport.use(new googleStrategy({
    clientID:env.google_client_id,
    clientSecret:env.google_client_secret,
    callbackURL:env.google_call_back_url
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
            //if user not found. create the user and set it as req.user  (req.user means signin user)
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