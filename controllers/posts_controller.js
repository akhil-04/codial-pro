const Post = require('../models/post');
const Comment = require('../models/comments');
const Like = require('../models/like');
// const User = require('../models/users');
// const mongoose = require('mongoose')

module.exports.create = async function(req, res){
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        // //for the name appearing under the post content
        // let userName = await User.findById(req.user._id);
        // userName = userName.name;

        //to check wheather the request is AJAX   type=xmlhttprequest(xhr)
        if(req.xhr){
             // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
             post = await post.populate('user', 'name').execPopulate();
            return res.status(200).json({
                data:{
                    post: post
                    // userName
                },
                messgae: "Post Created"
            });
        }
        console.log(req)
    
            req.flash('success', 'Post Created!');
            return res.redirect('back');
            
    }catch (err){
        // console.log('Error', err); this is when no flash
            req.flash('error', err);
            return res.redirect('back');
    }
}
   

module.exports.destroy = async function(req, res){
    try{
    let post = await Post.findById(req.params.id);
        //.id means converting the object _id into string for comparing
        if(post.user == req.user.id){

            //delete the associated likes of the post and all its comments' likes too
            await Like.deleteMany({likeable:post, onModel:'Post'});
            await Like.deleteMany({_id: {$in:post.comments}});


            post.remove();
           await Comment.deleteMany({post: req.params.id});

           if(req.xhr){
               return res.status(200).json({
                   data:{
                       post_id:req.params.id
                   },
                   messgae:'Post Deleted'
               });
           }

           
           req.flash('success', 'Post and Associated comments Deleted!');
                return res.redirect('back');
            }else{
                req.flash('error', 'You Cannot Delete The Post');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        console.log(err);
            return res.redirect('back');
    }
}