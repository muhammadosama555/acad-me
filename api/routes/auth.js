const express = require('express')
const { registerUser, loginUser, getMe, logout, getOTP, changePassword, resetPassword } = require('../controllers/authController')
const { protect } = require('../middlewares/auth')
const router=express.Router()




router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/logout',logout)
router.get('/me',getMe)
router.post('/generateOtp',getOTP)
router.put('/resetPassword',resetPassword)
router.post('/change-password',protect,changePassword)





module.exports=router