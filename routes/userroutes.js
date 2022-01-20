const express = require('express');
// const userController = require('./../controller/userController');
const authController = require('./../controller/authController');
const {passport }= require(".././auth/passport");
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotpassword', authController.forgotpassword);
router.post('/resetPassword/:token', authController.ResetPassword);


// router
//   .route('/')
//   .get(userController.getAllUsers)
//   .post(userController.createUser);




  module.exports = router;