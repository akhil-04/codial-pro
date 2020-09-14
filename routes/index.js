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

//for any further routes, acces from here 
//router.use('/routerNmae', require('./routerFile'));




// for exports this route to controller
module.exports = router;