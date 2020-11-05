// require the express
const express =  require('express');

//run that express
const app = express();

//port on which we run our server
const port = 8000;

//for the scss part and middleware for convert scss to css
const sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
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
const MongoStore = require('connect-mongo')(session);

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
    secret: 'blahsomething',
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

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

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