const User = require('../models/users');
const AccessToken = require('../models/accessToken');
const resetPasswordMailer = require('../mailers/reset_password_mailer');
const crypto = require('crypto');
const { fs } = require('fs');
const { localsName } = require('ejs');


module.exports.auth = function(req,res){
    return res.render('verify_email' , {
        title: "Codeial | Verify",
    });
}

module.exports.verifyEmail = async function(req, res){
    let user = await User.findOne({email:req.body.email});

    console.log(user,req.body);

    if(user){
        let token = await crypto.randomBytes(20).toString('hex');
        let accessToken = await AccessToken.create({
            user:user,
            token:token,
            email:user.email,
            isValid:true
        });

        resetPasswordMailer.resetPassword(accessToken);

        return res.render('account_verified', {
            title:"Codeial: Account Verified"
        });

    }else{
        req.flash("error", "Account does not exist with this email");
        return res.redirect('back');
    }
}


module.exports.resetPassword = async function(req, res){
    let accessToken = await AccessToken.findOne({token:req.query.accessToken})
    console.log('***************',req.query);

    if(accessToken){
        if(accessToken.isValid){
            return res.render('reset_password' , {
                title : 'Codeial | Reset Password',
                accessToken : accessToken.token
            })
        }
    }

    req.flash('error' , 'Token is Expired ! Pls regenerate it.');
    return res.redirect('/auth');

}

module.exports.reset = async function(req,res){
    console.log(req.query);
   let accessToken = await AccessToken.findOne({token:req.query.accessToken});
   console.log(accessToken ,'AccessToken' )

   if(accessToken){
    console.log('AccessToken present' );
    if(accessToken.isValid){
        console.log('AccessToken is valid' )
        accessToken.isValid = false;
        if(req.body.password == req.body.confirm_password){
            console.log('password matched' )
            let user = await User.findById(accessToken.user);
                if(user){
                    console.log('User found' , user )
                    user.password = req.body.password;
                    user.confirm_password = req.body.confirm_password;
                    accessToken.save();
                    user.save();
                    console.log('Password changed' , user )
                    req.flash('success' , 'Password Changed');
                    return res.redirect('/users/sign-in');
                }
        }else{
            req.flash('error','Password didnt matched ');
            return res.redirect('/')
        }

    }
   }

   req.flash('error' , 'Token is Expired ! Pls regenerate it.');
   return res.redirect('/auth');
}