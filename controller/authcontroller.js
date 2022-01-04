const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const bcrypt = require('bcrypt');
const sendEmail = require('./../utilis/email');
// require("dotenv").config();
let userstate;


//sign up
exports.signup =  (async (req, res) => {
    const { fullName, email, password, role } = req.body;
  
    const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
      (err) => {
        console.log("Error: ", err);
      }
    );
  
    if (alreadyExistsUser) {
      return res.status(409).json({ message: "User with email already exists!" });
    }
     let hashPassword = await bcrypt.hash(req.body.password, 10);
    // password= hashPassword;
    const newUser = new User({ fullName,email,password , role });
    newUser.password = hashPassword;
    const savedUser = await newUser.save().catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ error: "Cannot register user at the moment!" });
    });
  
    if (savedUser) res.json({ message: "Thanks for registering" });
  });



exports.login =  ( async (req, res) => {
  try{
        const { email, password } = req.body;
  
    const foundUser = await User.findOne({ where: { email } }).catch(
      (err) => {
        console.log("Error: ", err);
      }
    );
      if (foundUser) {
  
          let submittedPass = req.body.password; 
          let storedPass = foundUser.password; 
  
          const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
          if (passwordMatch) {
            const jwtToken = jwt.sign(
                  { id: foundUser.id, email: foundUser.email },
                 ""+ process.env.JWT_SECRET,
                );
              res.cookie("token",jwtToken)
                res.json({ message: "Welcome Back!", token: jwtToken });
          } else {
              res.send('email or password is incoreect');
          }
      }
      else {
  
          let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
          await bcrypt.compare(req.body.password, fakePass);
  
          res.send('email or password is incoreect');
      }
  } catch(error){
      res.send(error.message);
  }
});
///////////////////////////////////////////

//////////////////////////////////////////////
exports.restrictTo = (...roles)=>
{
  return (req , res , next) => {
    console.log(req.user);
    if(!roles.includes(req.user.role))
    {
      return res.status(401).json({
        message : 'you are not allow to access this '
      });
    }
    next();
  };
};

// forgot Password 
exports.forgotpassword = (async(req,res) =>{
  //Find User By Email 
  const {email} = req.body;
  const user = await User.findOne( {where : { email} });
    if(!user)
    {
      res.json({
        message : "Email Does Not Exist "
      })
    }
    //createrandom token 
    const resetToken = crypto.randomBytes(32).toString('hex');
//hash it 
    user.passwordResetTokeb = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    console.log({ resetToken },    user.passwordResetTokeb);
  
    user.passwordExpireAt = Date.now() + 10 * 60 * 1000;
   await user.save();
   ///////////////////////////////

   ///////////////////////////////////
   const resetUrl= `${req.protocol}: //${req.get ('host')}/users/resetPassword/${resetToken}`
   
   const message= `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetUrl}.\nIf you didn't forget your password, please ignore this email!`;

///sending mail 
   try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    user.passwordResetTokeb = undefined;
    user.passwordExpireAt = undefined;
    await user.save();
      console.log(err.message);
  }
  });
//Resetpassword 
exports.ResetPassword = (async(req,res) =>{

});