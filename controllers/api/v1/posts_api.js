const Post = require('../../../models/post');
const Comment = require('../../../models/comments');

module.exports.index = async function(req, res){

    //to find the posts in DB
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user', 'name')
    .populate({
        path: 'comments',
        populate: {
            path:'user'
        }
    });

    return res.json(200, {
        message: 'Lists of posts',
        posts: posts
    })
}


module.exports.destroy = async function(req, res){
    try{
    let post = await Post.findById(req.params.id);
        //.id means converting the object _id into string for comparing
        if(post.user == req.user.id){
            post.remove();
           await Comment.deleteMany({post: req.params.id});

         
           
        //    req.flash('success', 'Post and Associated comments Deleted!');
                return res.json(200, {
                    message:"Post and associated comments Deleted"
                });
            }else{
                return res.json(401, {
                    message:'you cant delete the post'
                });
        }
    }catch(err){
       
            return res.json(500,{
                message:"Internal Server Error"
            });
    }
}