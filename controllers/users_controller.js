//to use the models here
const User = require('../models/users');

module.exports.profile = function(req, res){
   if(req.cookies.user_id){
      User.findById(req.cookies.user_id, function(err, user){
         if(user){
            return res.render('profile',{
               title: "User Profile",
               user: user
            })
         }
         return res.redirect('/users/sign-in');
      });
   }
   else{
      return res.redirect('/users/sign-in')
   }
   // return res.render('profile',{
   //    title: "profile"
   // });
}

module.exports.post = function(req, res){
   return res.end('<h1>This is the post of users </h1>');
};
//render the sign up page
module.exports.signUp = function(req, res){
   return res.render('user_sign_up',{
      title: "Codeial | sign Up"
   });
}
//render the sign in page
module.exports.signIn = function(req, res){
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

            return res.redirect('/users/sign-in');
         })
      }else{
         return res.redirect('back');
      }
   });
}

//sign in and create a session for user
module.exports.createSession = function(req, res){
   //find the user
   // User.findOne({email: req.body.email}, function(err, user){
   //    if(err){ console.log('error in finding user in signing in'); return }

   //    //handle user found
   //    if(user){
   //       //handle password which doesn't match
   //       if(user.password != req.body.password){
   //          return res.redirect('back');
   //       }
   //       //handle session creating of user
   //       res.cookie('user_id', user.id);
   //       return res.redirect('/users/profile');
   //    }else{
   //       //handle if user not found
   //       return res.redirect('back');
   //    }
   // });
}