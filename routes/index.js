// require express here
const express = require('express');
//call the router 
const router = express.Router();
//requiring the controller here
const homeController = require('../controllers/home_controller');
//execesssing the controller
router.get('/', homeController.home);
// console.log('router exports ');





// for exports this route to controller
module.exports = router;