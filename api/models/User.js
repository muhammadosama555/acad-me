
const crypto= require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

 const UserSchema= new mongoose.Schema({
    name: {
        type:String,
        required:[true,'Please add a user name']
    },
    email:{
        type:String,
        unique:true,
    
        match:[
            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            'please add valid email'
        ]
    },
    imgUrl: {
        type: String,
        default: null,
      },
    role:{
        type:String,
        enum:['user','publisher'],
        default:'user'
    },
    password:{
        type:String,
        required:[true,'Please enter a password'],
        select:false,

    },
    orders: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Order',
        },
      ],
    createdAt: {
        type:Date,
        default:Date.now
    }
 })

 //Encrypt password using bcrypt
 UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password,salt)
 })


 //Sign JWT and return

 UserSchema.methods.getSignedJwtToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRE})
 }


 //Match user entered password to hashed paswsord in database
 UserSchema.methods.matchPassword=async function(enteredPassword){


    return await bcrypt.compare(enteredPassword,this.password)
 }


  //Generate and hashPassword token
  UserSchema.methods.getResetPasswordToken= function(){
    //Generate Token
    const resetToken= crypto.randomBytes(20).toString('hex')

    //Hash token and set to resetPasswordToken field
    this.resetPasswordToken= crypto.createHash('sha256').update(resetToken).digest('hex')

    //Set Expire 
    this.resetPasswordExpire= Date.now() +10*60*1000
    return resetToken
  }

  // Update the getResetPasswordToken method
UserSchema.methods.getResetPasswordToken = function() {
  // Generate the 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Set the OTP and its expiration time
  this.resetPasswordToken = otp;
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  // Return the generated OTP
  return otp;
};


 module.exports=mongoose.model('User',UserSchema)