//to use the models here
const User = require('../models/users');

module.exports.profile = function(req, res){
      User.findById(req.params.id, function(err, user){
      return res.render('profile',{
         title: "Profile",
         profile_user:user
      });
   });
}

module.exports.post = function(req, res){
   return res.end('<h1>This is the post of users </h1>');
};

// for update part
module.exports.update = function(req, res){
   if(req.user.id == req.params.id){
      User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
         //req.body or we can we write
         //{name:req.body,name, email: req.body.email}
         return res.redirect('back');
      });
   }else{
      return res.status(401).send('Unauthorized');
   }
}


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