const express = require('express')
const { registerUser, loginUser, getMe, forgotPassword } = require('../controllers/authController')
const router=express.Router()




router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/me',getMe)
router.post('/forgotPassword',forgotPassword)





module.exports=router