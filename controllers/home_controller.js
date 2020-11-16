//create a action 
//to create action just do 

const { populate } = require('../models/post');
const Post = require('../models/post');
const User = require('../models/users');

//module.exports.actionName = function(req, res){ //write the function }
module.exports.home = function(req, res){
    // console.log(req.cookies);

    //to show the post on homepage
    // Post.find({}, function(err, posts){
    //     return res.render('home',{
    //         title: "Codeial | home",
    //         posts: posts
    //     }); 
    // });


    //populate the whole user object from each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path:'user'
        }
    })
    .exec(function(err, posts){
        User.find({}, function(err, users){
            return res.render('home',{
                title: "Codeial | home",
                posts: posts,
                all_users: users
            });
        });
    })

    
    // return res.end('<h1> Express is up for Codeial! </h1>');

}
