const express = require('express');
const router = express.Router();


//handles the all v1 routes 
router.use('/v1', require('./v1'));

//handles the all v1 routes 
router.use('/v2', require('./v2'));

module.exports = router;