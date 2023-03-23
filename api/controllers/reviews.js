const errorResponse= require("../utils/errorResponse.js")
const asyncHandler=require('../middlewares/async.js')
const Review = require('../models/Review.js')
const Bootcamp = require('../models/Bootcamp.js')
const ErrorResponse = require("../utils/errorResponse.js")


// get    Reviews
//route    GET   /api/v1/reviews
//access   public

exports.getReviews=asyncHandler(async(req,res,next)=>{
    if(req.params.bootcampId){
        const reviews=await Review.find({bootcamp:req.params.bootcampId})
    
        res.status(200).json({
            success:true,
            count: reviews.length,
            data:reviews
        })
    }else{
        res.status(200).json(res.advanceResults)
    }
  
})



// get    Single Reviews
//route    GET   /api/v1/reviews/id
//access   public

exports.getReview=asyncHandler(async(req,res,next)=>{
  const review=await Review.findById(req.params.id).populate({
    path: 'bootcamp',
    select:'name description'
  })
  if(!review){
    return next(new errorResponse('no review found with id'),404)
  }
  res.status(200).json({
    success:true,
    data:review
 
  })
})
// Post   add Reviews
//route    Post   /api/v1/bootcamps/:bootcampId/reviews
//access   private

exports.addReview=asyncHandler(async(req,res,next)=>{
  req.body.bootcamp=req.params.bootcampId
  req.body.user= req.user.id
  console.log(req.params);
  const bootcamp=await Bootcamp.findById(req.params.bootcampId)

  if(!bootcamp){
    return next(new ErrorResponse('no bootcamp found with given id',404))
  }

  const review=await Review.create(req.body)

  res.status(201).json({
    success:true,
    data: review
  })

})
