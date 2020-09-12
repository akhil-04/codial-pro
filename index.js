// require the express
const express =  require('express');

//run that express
const app = express();

//port on which we run our server
const port = 8000;

//create middleware for routes
app.use('/', require('./routes'));

//bind connection with host and server
app.listen(port, function(err){
    if(err){
        //interpolation is here
        console.log(`error in running server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});