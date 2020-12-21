const passport = require('passport');
const fbStrategy = require('passport-facebook').Strategy;
const crypto = require('crypto');
const User = require('../models/users');

passport.use(new fbStrategy({
    clientID: '964578310948142',
    clientSecret: '4210f8672bc791e4848d85122afe554a',
    callbackURL: "http://localhost:8000/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, done){
    User.findOne({email:profile.email}).exec(function(err,user){
        if(err){
            console.log('error in google startegy', err);
            return;
        }

        console.log(accessToken, refreshToken);
        console.log(profile);

        if(user){
            return done(null, user);
        }else{
            User.create({
                name:profile.displayName,
                email:profile.email,
                password: crypto.randomBytes(20).toString('hex')
            }, function(err,user){
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
   
        