const Post = require('../models/post');
const Comment = require('../models/comments');

module.exports.create = async function(req, res){
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        //to check wheather the request is AJAX   type=xmlhttprequest(xhr)
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post: post
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
        // console.log('Error', err);
            return res.redirect('back');
    }
}