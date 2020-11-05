//to use the models here
const User = require('../models/users');

module.exports.profile = function(req, res){
   return res.render('profile',{
      title: "profile"
   });
}

module.exports.post = function(req, res){
   return res.end('<h1>This is the post of users </h1>');
};
//render the sign up page
module.exports.signUp = function(req, res){
   if(req.isAuthenticated()){
      return res.redirect('profile');
   }
   return res.render('user_sign_up',{
      title: "Codeial | sign Up"
   });
}
//render the sign in page
module.exports.signIn = function(req, res){
   if(req.isAuthenticated()){
      return res.redirect('profile');
   }
   return res.render('user_sign_in',{
      title: "Codeial | sign In"
   });
}

//get the sign up data here
module.exports.create = function(req,res){
   if(req.body.password != req.body.confirm_password){
      return res.redirect('back');
   }
   User.findOne({email: req.body.email}, function(err, user){
      if(err){console.log('error in siging up'); return }

      if(!user){
         User.create(req.body, function(err, user){
            if(err){console.log('error in creating user while sign up'); return }

            return res.redirect('sign-in');
         })
      }else{
         return res.redirect('back');
      }
   });
}

//sign in and create a session for user
module.exports.createSession = function(req, res){
  return res.redirect('/users/profile');
}


module.exports.destroySession =(req,res)=>{
   req.logout();
  return res.redirect('/');
}