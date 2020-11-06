//create a action 
//to create action just do 

const Post = require('../models/post');

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
    Post.find({}).populate('user').exec(function(err, posts){
        return res.render('home',{
            title: "Codeial | home",
            posts: posts
        }); 
    });
    
    // return res.end('<h1> Express is up for Codeial! </h1>');
}

//code toh sahi hain