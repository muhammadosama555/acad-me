const ErrorResponse= require("../utils/errorResponse.js")
const asyncHandler=require('../middlewares/async.js')
const User = require('../models/User.js')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API)


//desc   Register user
//route   Post /api/v1/auth/register
//access  Public

exports.registerUser = asyncHandler(async (req,res,next)=>{
    const {name,email,password, role} =req.body

    //Create user
    const user= await User.create({
        name,
        email,
        password,
        role
    })

    sendTokenResponse(user,200,res)
    
})
//desc   login  user
//route   Post /api/v1/auth/login
//access  Public

exports.loginUser = asyncHandler(async (req,res,next)=>{
    const {email,password} =req.body

    //Validate email and password
    if(!email || !password){
        return next(new ErrorResponse('Please provide correct email and password',404))
    }
    const user=await User.findOne({email}).select('+password')
    if(!user){
        return next(new ErrorResponse('User not found',404))
    }

    const isMatch=await user.matchPassword(password)
    if(!isMatch){
        return next(new ErrorResponse('Invalid password',401))
    }


   sendTokenResponse(user,200,res)
})


//Get token from model,create cookie and send response 
const sendTokenResponse = (user,statusCode,res)=>{
   
    //Create token
    const token=user.getSignedJwtToken()

    const options={
        expires: new Date(Date.now()+ process.env.JWT_COOKIE*24*60*60*1000),
        httpOnly: true
    }
    
    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        data:user,
        token
    })
}


//desc   Get curent login  user
//route   Post /api/v1/auth/me
//access  Private

exports.logout = asyncHandler(async (req,res,next)=>{
     
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    
    res.status(200).json({
        success:true,
        message:"user logged out"
    })
})
//desc   Get curent login  user
//route   Post /api/v1/auth/me
//access  Private

exports.getMe = asyncHandler(async (req,res,next)=>{
    const user = await User.findById(req.user.id)
    
    res.status(200).json({
        success:true,
        data:user
    })
})

//------------------------------------------------------ Forgot Password  -----------------------------------------//
//desc    get OTP
//route   Post /api/v1/auth/genereateOtp
//access  private

exports.getOTP = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
  
    const user = await User.findOne({ email });
  
    if (!user) {
      return next(new ErrorResponse("No user with this email", 404));
    }
  
    // Generate the 6-digit OTP and set the reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
  
    const body = `<p>Your reset token is:</p></br><b>${resetToken}</b>`
  
    const msg = {
      to: email, // Change to your recipient
      from: process.env.SENDGRID_SENDER, // Change to your verified sender
      subject: 'Reset Token',
      html: body,
    }
    sgMail
      .send(msg)
      .then(() => {
        res.send({
          success: true,
          message: 'Email sent',
      });
      })
      .catch((error) => {
        console.error(error)
        res.status(500).send({
          success: false,
          message: 'Something went wrong. Try again later'
      });
      })
  
  });


//------------------------------------------------------ Reset Password  -----------------------------------------//
//desc    Reset Password
//route   /api/v1/auth/resetPassword
//access  private
exports.resetPassword = asyncHandler(async (req, res, next) => {
    const { resetToken, password, email } = req.body;
  
    if (!resetToken || !password || !email) {
      return next(new ErrorResponse("Invalid request parameters", 400));
    }
  
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() },
      email: email,
    });
  
    if (!user) {
      return next(new ErrorResponse("Invalid or expired reset token", 400));
    }
  
    // Set the new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
  
    // Send the success response
    res.status(200).json({
      success: true,
      data: "Password reset successful",
    });
  });


  //------------------------------------------------------ Change Password  -----------------------------------------//
  //desc    Change Password
  //route   Post /api/v1/auth/change-password
  //access  private
  exports.changePassword = asyncHandler(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;
  
    // Find the user by ID
    const user = await User.findById(userId).select("+password");
  
    // Check if the provided old password matches the user's current password
    if (!(await user.matchPassword(oldPassword))) {
      return next(new ErrorResponse('Invalid old password', 400));
    }
  
    // Set the new password and save the user
    user.password = newPassword;
    await user.save();
  
    res.status(200).json({
      success: true,
      message: 'Password updated successfully',
    });
  });