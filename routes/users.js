const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller'); 
router.get('/profile/:id', passport.checkAuthentication , usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

// router.get('/profile', passport.checkAuthentication, usersController.xyz);

router.get('/post',usersController.post);

router.get('/sign-up', usersController.signUp);

router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);

router.post('/chatMessage', usersController.chatMessage);
//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);

router.get('/sign-out',usersController.destroySession);


//google oauth routes
router.get('/auth/google', passport.authenticate('google',{scope:['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect:'/users/sign-in'}), usersController.createSession);

//fb oauth routes
router.get('/auth/facebook', passport.authenticate('facebook',{scope:['profile', 'email']}));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect:'/users/sign-in'}), usersController.createSession);

module.exports = router;