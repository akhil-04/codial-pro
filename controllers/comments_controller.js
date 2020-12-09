const Comment = require('../models/comments');
const Post = require('../models/post');


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
        await Post.findByIdAndUpdate(postId, {$pull:{
                comments: req.params.id
            }});
            req.flash('success', 'Comment Deleted');
                return res.redirect('back');
            }else{
                req.flash('success', 'You cannot delete commet');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
            return res.redirect('back');
        // console.log('Error', err);
        //     return;
    }
}
