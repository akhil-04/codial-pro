module.exports.profile = function(req, res){
   return res.render('profile',{
      title: "profile"
   });
}

module.exports.post = function(req, res){
   return res.end('<h1>This is the post of users </h1>');
};
//render the sign up page
module.exports.signUp = function(req, res){
   return res.render('user_sign_up',{
      title: "Codeial | sign Up"
   });
}
//render the sign in page
module.exports.signIn = function(req, res){
   return res.render('user_sign_in',{
      title: "Codeial | sign In"
   });
}

//get the sign up data here
module.exports.create = function(){
   //todo later
}

//cr
module.exports.createSession = function(){
   //todo later
}