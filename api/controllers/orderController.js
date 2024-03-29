const ErrorResponse = require("../utils/errorResponse");
const asyncHandler=require('../middlewares/async.js')
const Order = require("../models/Order");
const Course = require("../models/Course"); 
const User = require("../models/User"); 
const jwt = require('jsonwebtoken');

//------------------------------------------------------ Create Order  ------------------------------------------//
// desc    Create Order
// route   POST /api/orders
// access  private
exports.createOrder = asyncHandler(async (req, res, next) => {
  const { courseIds, totalAmount, paymentStatus, shippingInfo, quantity } = req.body;

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
  console.log("Decoded user ID:", userId);


   // Find the courses being ordered by their IDs
   const courses = await Course.find({ _id: { $in: courseIds } });
   console.log(courses)
 
  //  Check if any of the courses are not found
   const notFoundCourses = courseIds.filter((courseId) => !courses.find((course) => course._id.equals(courseId)));
   if (notFoundCourses.length > 0) {
     return next(new ErrorResponse(`Courses not found: ${notFoundCourses.join(', ')}`, 404));
   }

  // Create a new order object with the user ID and order data
  const order = new Order({
    user: userId,
    itemsOrderd: courseIds,
    totalAmount,
    paymentStatus,
    shippingInfo,
    quantity
    
    // Add more fields as needed for your order schema
  });

  // Save the new order to the database
  await order.save();

  // Add the order to the user's orders array
  const user = await User.findById(userId);
  user.orders.push(order._id);
  await user.save();


  // Return the new order as the response
  res.status(201).json(order);
});

//------------------------------------------------------ Update Order  -----------------------------------------//
// desc    Update Order
// route   PUT /api/orders/:id
// access  private
exports.updateOrder = asyncHandler(async (req, res, next) => {
  const { totalAmount } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { totalAmount }, // Update the fields you want to modify
    {
      new: true,
      runValidators: true,
    }
  );

  if (!order) {
    return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

//------------------------------------------------------ Get All Orders  -----------------------------------------//
// desc    Get All Orders
// route   GET /api/orders
// access  private
exports.getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find().populate("itemsOrderd",'title tuition').populate("user",'name');

  if (!orders) {
    return next(new ErrorResponse("No orders found", 404));
  }

  res.status(200).json({
    success: true,
    data: orders,
  });
});

//------------------------------------------------------ Get Single Order  -----------------------------------------//
// desc    Get Single Order
// route   GET /api/orders/:id
// access  private
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("itemsOrderd",'title tuition').populate("user",'name');

  if (!order) {
    return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

//------------------------------------------------------ Delete Order  -----------------------------------------//
// desc    Delete Order
// route   DELETE /api/orders/:id
// access  private
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
  }

  // Remove the order from the user's orders array
  const user = await User.findById(order.user);
  user.orders = user.orders.filter((orderId) => orderId.toString() !== order._id.toString());
  await user.save();

  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});
