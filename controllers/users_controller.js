//to use the models here
//lets keep it simple not in async await
const User = require('../models/users');
const Friendships = require('../models/friendship');
const chatMessage = require('../models/chat_messages');

//these two const for deleting the other versions of image
const fs = require('fs');
const path = require('path');


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
module.exports.update = async function(req, res){
   // if(req.user.id == req.params.id){
   //    User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
   //       //req.body or we can we write
   //       //{name:req.body,name, email: req.body.email}
   //       req.flash('success', 'Profile Updated');
   //       return res.redirect('back');
   //    });
   // }else{
   //    req.flash('error', err);
   //          return res.redirect('back');
   //    // return res.status(401).send('Unauthorized');
   // }
   
   //for profile pic

   if(req.user.id == req.params.id){
      try{

         let user = await User.findByIdAndUpdate(req.params.id);

         User.uploadedAvatar(req, res, function(err){
            if(err){
               console.log('*******Multer Error', err)
            }

            // console.log(req.file);

            user.name = req.body.name;
            user.email = req.body.email;

            if(req.file){

               if(user.avatar){

                  if(fs.existsSync(path.join(__dirname, '..', user.avatar))){

                     // fs=fileSystem, unlinkSync=deleteFunction, other is part where to delete 
                  fs.unlinkSync(path.join(__dirname, '..', user.avatar)); 
                  
                  }
                  
               }
               //saving the path of uploaded filr into the avatar field in user
               user.avatar = User.avatarPath + '/' + req.file.filename;
            }

            user.save();
            // request.flash("successs", "Profile Updated Successfully");
            return res.redirect('back');
         });

      }catch(err){
         req.flash('error', err);
         res.redirect('back'); 
      }
}else{
      req.flash('error', 'Unauthorized');
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
      return res.redirect('/users/profile');
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
   req.flash('success', 'Logged In successfully');
   console.log(req.body)
   console.log(res.body)
  return res.redirect('/');
}


module.exports.destroySession =(req,res)=>{
   req.logout();
   req.flash('success', 'Logged Out successfully');
  return res.redirect('/');
}

module.exports.chatMessage = function(req,res){
  chatMessage.create({
     content:req.body.content,
     user:req.user._id,
     email:req.user.email
  }, function(err, chat){
   if(err){
      console.log('chat message creating error', err)
      return;
   }

   return res.redirect('back');
  });
}