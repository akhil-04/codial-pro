// require express here
const express = require('express');
//call the router 
const router = express.Router();
//requiring the controller here
const homeController = require('../controllers/home_controller');
//execesssing the controller this handles home request
router.get('/', homeController.home);
// this handles the /users request
router.use('/users', require('./users'));
//this handles the posts
router.use('/posts', require('./posts'));

//for any further routes, acces from here 
//router.use('/routerNmae', require('./routerFile'));

//handles the comments 
router.use('/comments', require('./comments'));

//handles the api part
router.use('/api', require('./api'));

//handles the likes part
router.use('/likes', require('./likes'));

//handles the reset password and email.verify part
router.use("/auth" , require("./auth"));


// for exports this route to controller
module.exports = router;