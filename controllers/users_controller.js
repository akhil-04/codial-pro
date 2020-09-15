module.exports.profile = function(req, res){
   return res.render('profile',{
      title: "profile"
   });
}

module.exports.post = function(req, res){
   return res.end('<h1>This is the post of users </h1>');
};