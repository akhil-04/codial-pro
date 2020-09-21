// require the express
const express =  require('express');

//run that express
const app = express();

//port on which we run our server
const port = 8000;

//requring the cookies
const cookieParser = require('cookie-parser');
//need to tell app to use this
app.use(express.urlencoded());
app.use(cookieParser());
//requring the ejs-layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);


//requiring mongoose here
const db = require('./config/mongoose');

//extarct style and script from sub pages to layout
app.set('layout extractStyles' ,true);
app.set('layout extractScripts' ,true);

//for assesssing static files
app.use(express.static('./assets'));

//ejs requiring and giving path of folder
app.set('view engine', 'ejs');
app.set('views', './views');

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

//wait