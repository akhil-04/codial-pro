const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

//authentication
passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(email, passport, done){
    //find a user and establish the identity
    User.findOne({email: email}, function(err, user){
        if(err){
            console.log('error in finding the user --> passport');
            return done(err);
        }

        if(!user || user.password != password){
            console.log('Invalid username /password');
            return done(null, false);
        }
        return done(null, user);
    });
    }
));

//serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user, done){
    done(null, user.id);


//deserialize tthe user from the key in cookies
passport.deserializeUser(function(id, done){
    if(err){
        console.log('error in finding the user');
        return done(err);
    }
    return done(null ,user);
    });
});


module.exports = passport;