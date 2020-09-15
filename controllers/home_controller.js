//create a action 
//to create action just do 
//module.exports.actionName = function(req, res){ //write the function }
module.exports.home = function(req, res){
    return res.render('home',{
        title: "home"
    });
    // return res.end('<h1> Express is up for Codeial! </h1>');
}

