const express = require('express');
// const userController = require('./../controller/userController');
const userController = require('./../controller/usercontroller');
const authController = require('./../controller/authcontroller');
const {passport }= require(".././auth/passport");
const router = express.Router();

// authController.restrictTo( 'user' , 'admin') 
router.get('/users',  passport.authenticate("jwt", { session: false }), authController.restrictTo( 'user' , 'admin') ,  userController.allusers);
// router.post('/login', authController.login);


// router
//   .route('/')
//   .get(userController.allusers);




  module.exports = router;