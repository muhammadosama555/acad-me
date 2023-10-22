const path =require('path')
const ErrorResponse= require("../utils/errorResponse.js")
const asyncHandler=require('../middlewares/async.js')
const Bootcamp = require('../models/Bootcamp.js')
const { geoSearch } = require("../models/Bootcamp.js")
const geocoder = require("../utils/geocoder.js")
const jwt = require('jsonwebtoken');
const cloudinary = require("../config/cloudinary.js");
const sharp = require("sharp");


// get all bootcamps
//route    GET   /api/v1/bootcamps
//access   public

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const page = req.query.page
  const limit = req.query.limit
  const maxRating = req.query.maxRating; 
  const careers = req.query.careers ? JSON.parse(req.query.careers) : [];
  // Pagination options
  const parsedPage = parseInt(page, 10) || 1;
  const parsedLimit = parseInt(limit, 5) || 5;
  const skip = (parsedPage - 1) * parsedLimit;
  

  let sortOptions = {};
  const sort = req.query.sort

  if (sort === "name") {
    sortOptions.name = 1;
  } else if (sort === "-name") {
    sortOptions.name = -1;
  } 

  // Search by name
  const searchQuery = req.query.search ? { name: { $regex: req.query.search, $options: 'i' } } : {};


  // Search by careers (if provided)
  const careersQuery = careers.length > 0 ? { careers: { $in: careers } } : {};


  const ratingQuery = maxRating ? { averageRating: { $lte: parseFloat(maxRating) }} : {}
  // Build the query
  const query = Bootcamp.find({ ...searchQuery,...careersQuery,...ratingQuery })
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);

  // Execute the query
  const bootcamps = await query;

  // Get total count of bootcamps for pagination
  const totalCount = await Bootcamp.countDocuments({ ...searchQuery, ...careersQuery, ...ratingQuery });
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
    data: bootcamps,
  });
});


//desc     Get single bootcamps
//route    GET   /api/v1/bootcamps/:id
//access   public
exports.getSingleBootcamps=asyncHandler( async(req,res,next)=>{
  
    const bootcamps= await Bootcamp.findById(req.params.id)
    if(!bootcamps){
      return next(new ErrorResponse('no bootcamp with given id',400))
    }

    res.status(201).json({
      success:true,
      data:bootcamps
    })
    
    
   
  
})


//desc   post new bootcamps
//route    post   /api/v1/bootcamps
//access   private
exports.postBootcamps=asyncHandler( async(req,res,next)=>{
    
   // Get the authorization header from the request
  const authHeader = req.headers.authorization;

  // If the authorization header doesn't exist, return an error
  if (!authHeader) {
    return next(new ErrorResponse('Authorization header missing', 401));
  }
 
  // Extract the token from the authorization header
  const token = authHeader.split(' ')[1];

  // Verify the token to get the user ID
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.id;

  let imageUrl;

  // Check if an image file is included in the request
  if (req.file) {
    const processedImage = await sharp(req.file.buffer)
      .resize(500, 500)
      .jpeg({ quality: 70 })
      .toBuffer();

    // Convert the buffer to a data URI
    const dataURI = `data:image/jpeg;base64,${processedImage.toString("base64")}`;
    
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: "image",
      format: "jpg",
      public_id: `${userId}_${Date.now()}`,
    });

    imageUrl = result.secure_url;
  }

  
    
    //Check for published bootcamps
    const publishBootcamp= await Bootcamp.findOne({user: userId})
    // If the user is not an admin they can only add one bootcamp
    if(publishBootcamp && req.user.role !== 'admin'){
     
      return next(new ErrorResponse('user with this id has already published bootcamp',400))

    }
    // Create a new academy object with the imageUrl and user ID
  const bootcamp = new Bootcamp({
    imageUrl: imageUrl,
    user: userId, // Set the user field to the userId
  });

  // Save the new academy to the database
  const savedBootcamp = await bootcamp.save();

  // Return the new academy as the response
  res.status(201).json({
    success: true,
    data: savedBootcamp,
  });
 
})

//update bootcamps
//route    PT   /api/v1/bootcamps/:id
//access   private
exports.updateBootcamps=asyncHandler( async(req,res,next)=>{
    

      let bootcamp=await Bootcamp.findById(req.params.id)

        if (!bootcamp) {
           return next(
              new ErrorResponse('bootcamp not found with id',400)
            )
        }

        //Make sure user is bootcamp owner
        if(bootcamp.user.toString() !==req.user.id && req.user.role !== 'admin'){
          return next(
            new ErrorResponse('user id is not authorized to update',400)
          )
        }

        bootcamp=await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
          new:true,
          runValidators:true
        })

        res.status(200).json({
            success:true,
            data:bootcamp

        })
      

})

//delete bootcamps
//route    DELETE   /api/v1/bootcamps/:id
//access   delete
exports.deleteBootcamps=asyncHandler( async(req,res,next)=>{

 
    const bootcamp = await Bootcamp.findById(req.params.id)

    if (!bootcamp) {
      return next(
        new ErrorResponse('bootcamp not found with id',400)
      )
    
 }
  //Make sure user is bootcamp owner 
  if(bootcamp.user.toString() !==req.user.id && req.user.role !== 'admin'){
    return next(
      new ErrorResponse('user id is not authorized to update',400)
    )
  }
 bootcamp.remove()
 
 res.status(200).json({
     success:true,
     message:"successfully deleted"
 
 })
  

})
//desc    GEt bootcamps in a given radius
//route    DELETE   /api/v1/bootcamps/radius/:zipcode/:distance
//access   delete
exports.getBootcampsInRadius=asyncHandler( async(req,res,next)=>{

 const {zipcode, distance}= req.params


 //Get lat/lng from geocoder
 const loc= await geocoder.geocode(zipcode)
 const lat=loc[0].latitude
 const lng =loc[0].longitude

 //calc radius using radians
 // divide dist by radius of earth
 // Earth radius = 3963 mi/6278 km
 const radius = distance/3963;

 const bootcamps=await Bootcamp.find({
  location: { $ :{ $centerSphere:[[lng,lat],radius]}}
 })

 res.status(200).json({
  success:true,
  count:bootcamps.length,
  data: bootcamps

 })
  

})


