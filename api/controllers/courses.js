const errorResponse= require("../utils/errorResponse.js")
const asyncHandler=require('../middlewares/async.js')
const Course = require('../models/Course.js')
const Bootcamp = require('../models/Bootcamp.js')
const cloudinary = require("../config/cloudinary.js");
const sharp = require("sharp");


// get all Courses
//route    GET   /api/v1/bootcamps
//access   public

exports.getCourses = asyncHandler(async (req, res, next) => {

  const bootcampId = req.params.bootcampId; // Extract bootcampId from request parameters

  // If bootcampId is present, return only courses of that bootcamp
  if (bootcampId) {
    const courses = await Course.find({ bootcamp: bootcampId });

    res.status(200).json({
      success: true,
      data: courses,
    });
  } else {

  const page = req.query.page;
  const limit = req.query.limit;
  const sort = req.query.sort;
  const search = req.query.search;

  // Pagination options
  const parsedPage = parseInt(page, 10) || 1;
  const parsedLimit = parseInt(limit, 10) || 5;
  const skip = (parsedPage - 1) * parsedLimit;

  let sortOptions = {};
  
  if (sort === 'title') {
    sortOptions.title = 1;
  } else if (sort === '-title') {
    sortOptions.title = -1;
  } else if (sort === 'tuition') {
    sortOptions.tuition = 1;
  } else if (sort === '-tuition') {
    sortOptions.tuition = -1;
  }

  // Search by title
  const searchQuery = search ? { title: { $regex: search, $options: 'i' } } : {};

  // Build the query
  const query = Course.find({ ...searchQuery })
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);

  // Execute the query
  const courses = await query;

  // Get total count of courses for pagination
  const totalCount = await Course.countDocuments({ ...searchQuery });
  const totalPages = Math.ceil(totalCount / parsedLimit);

  // Pagination result
  const pagination = {};
  if (skip > 0) {
    pagination.prev = {
      page: parsedPage - 1,
      limit: parsedLimit,
    };
  }

  if (skip + parsedLimit < totalCount) {
    pagination.next = {
      page: parsedPage + 1,
      limit: parsedLimit,
    };
  }

  res.status(200).json({
    success: true,
    pagination,
    totalCount,
    totalPages,
    data: courses,
  });
}
});

  
// get single Courses
//route    GET   /api/v1/courses/id
//access   public

exports.getSingleCourse=asyncHandler(async(req,res,next)=>{
   
    const course = await Course.findById(req.params.id).populate({

        path:'bootcamp',
        select: 'name description'
    }
        )

    if(!course){
        return next(
            new errorResponse('no course found with id',404)
        )
    }

    res.status(200).json({
        success:true,
       
        data:course
    })
})



// Post single Courses
// route    POST   /api/v1/bootcamps/:bootcampId/courses
// access   private

exports.postNewCourse = asyncHandler(async (req, res, next) => {
  console.log(req.body,req.params,req.file)
  req.body.bootcamp = req.body.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.body.bootcampId);

  if (!bootcamp) {
    return next(new errorResponse('No bootcamp found with id', 404));
  }

  // Make sure user is bootcamp owner
  if (
    bootcamp.user.toString() !== req.user.id &&
    (req.user.role !== 'admin' || req.user.role !== 'publisher')
  ) {
    return next(
      new errorResponse('User is not authorized to add a course', 400)
    );
  }

  let imageUrl;
  // Check if an image file is included in the request
  if (req.file) {
    const processedImage = await sharp(req.file.buffer)
      .resize(500, 500)
      .jpeg({ quality: 70 })
      .toBuffer();

    // Convert the buffer to a data URI
    const dataURI = `data:image/jpeg;base64,${processedImage.toString(
      'base64'
    )}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'image',
      format: 'jpg',
      public_id: `${req.user.id}_${Date.now()}`,
    });

    req.body.imageUrl = result.secure_url;
  }


  const course = await Course.create(req.body);
  

  res.status(200).json({
    success: true,
    data: course,
  });
});



// Update single Courses
//route    PUT   /api/v1/courses/id
//access   private

exports.updateCourse=asyncHandler(async(req,res,next)=>{
     
    
     
    const course = await Course.findByIdAndUpdate(req.params.id,req.body,{new:true,
     runValidators:true})
    if(!course){
        return next(
            new errorResponse('no course found with id',404)
        )
    }
      //Make sure user is course owner 
  if(course.user.toString() !==req.user.id && req.user.role !== 'admin'){
    return next(
      new errorResponse('user id is not authorized to updates',400)
    )
  }


    res.status(200).json({
        success:true,
       
        data:course
    })
})



// Delete single Courses
//route    DELETE   /api/v1/courses/id
//access   private

exports.deleteCourse=asyncHandler(async(req,res,next)=>{
     
    
     
    const course = await Course.findByIdAndDelete(req.params.id)
    if(!course){
        return next(
            new errorResponse(('no course found with id'),404)
        )
    }
        //Make sure user is course owner 
  if(course.user.toString() !==req.user.id && req.user.role !== 'admin'){
    return next(
      new errorResponse('user id is not authorized to delete course',400)
    )
  }


    res.status(200).json({
        success:true,
       
        message:"course deleted successfully"
    })
})