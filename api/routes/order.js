const express = require('express');
const {
  createOrder,
  updateOrder,
  getAllOrders,
  getOrder,
  deleteOrder,
} = require('../controllers/orderController');
const { protect,authorize } = require('../middlewares/auth');

const router = express.Router();

// Define order routes
router.get('/', protect,authorize('user','admin'), getAllOrders);
router.post('/', protect,authorize('user','admin'), createOrder);
router.put('/:id', protect,authorize('user','admin'), updateOrder);
router.get('/:id', protect,authorize('user','admin'), getOrder);
router.delete('/:id', protect,authorize('user','admin'), deleteOrder);

module.exports = router;
