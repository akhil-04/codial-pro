const Comment = require('../models/comments');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                if(err){
                    console.log('error in creating comments');
                }
                

                //comments is pushed to the post 
                post.comments.push(comment);
                //if we update , we call save()
                post.save();

                res.redirect('/');
            });
        }
    });
}