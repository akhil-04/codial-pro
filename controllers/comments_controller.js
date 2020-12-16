const Comment = require('../models/comments');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailers');


//In async await 
module.exports.create = async function(req, res){
    try{
        
    let post = await Post.findById(req.body.post);
        if(post){
            let comment=await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
                

                //comments is pushed to the post 
                post.comments.push(comment);
                //if we update , we call save()
                post.save();
        
                // console.log(comment);

                //we prepopulated the user and send the mail to user who made comment
                comment = await comment.populate('user', 'name email').execPopulate();
                commentsMailer.newComment(comment);
                if(req.xhr){
                   
                    return res.status(200).json({
                        data:{
                            comment:comment
                        },

                        message:'comment created'
                    });
                }
                console.log("not xhr req");

                req.flash('success', 'Comment Created!');
                return res.redirect('back');
            }
        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
            // console.log('Error', err);
            // return;
        }
}




module.exports.destroy = async function(req, res){
    try{
    let comment = await Comment.findById(req.params.id);
        //console.log(req.params.id);
        if(comment.user == req.user.id){
            let postId = Comment.post;
            comment.remove();
       let post =  await Post.findByIdAndUpdate(postId, {$pull:{
                comments: req.params.id
            }});


            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment_id:req.params.id
                    },
                    messgae:'Comment Deleted'
                });
            }


            req.flash('success', 'Comment Deleted');
                return res.redirect('back');
            }else{
                req.flash('success', 'You cannot delete comment');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
            return res.redirect('back');
        // console.log('Error', err);
        //     return;
    }
}
