// require the express
const express =  require('express');

//run that express
const app = express();
require('./config/view-helpers')(app);

//port on which we run our server
const port = 8000;

//for the scss part and middleware for convert scss to css
const sassMiddleware = require('node-sass-middleware');
//for usage of flash message
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
//make the uploads path available to the browser 
app.use('/uploads', express.static(__dirname + '/uploads'));

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

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const passportFb = require('./config/passport-fb-oauth-strategy');
const MongoStore = require('connect-mongo')(session);
const env = require('./config/environment');

// const Path=require('path');
// require('dotenv').config({ path:Path.join(__dirname,'env','one.env')});

//setup chatservr to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chatserver is running on port 5000');

//extarct style and script from sub pages to layout
app.set('layout extractStyles' ,true);
app.set('layout extractScripts' ,true);

//for assesssing static files
app.use(express.static('./assets'));

//ejs requiring and giving path of folder
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeail',
    secret: env.sesssion_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000* 3600 * 48)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || "connect mongodb setup ok");
        }
    )
}));

// app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

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