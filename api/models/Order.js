const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  itemsOrderd: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Course', // Reference to the Course model
      required: true,
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  quantity:{
    type: Number,
    required: true,
  },
  shippingInfo: {
    // Define shipping information fields
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // You can add more fields as needed, such as payment method, transaction ID, etc.
});

module.exports = mongoose.model('Order', OrderSchema);
