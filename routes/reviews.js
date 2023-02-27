const express= require('express')
const Review=require('../models/Review')
const router=express.Router()

const advanceResults=require('../middlewares/auth')
const { getReviews, getReview } = require('../controllers/reviews')



router.get('/',getReviews)
router.get('/id',getReview)
module.exports=router

