const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orders-controller');

router.get('/', auth, getOrders);

router.get('/:id', auth, getOrder);

router.post('/', createOrder);

router.put('/:id', auth, updateOrder);

router.delete('/:id', auth, deleteOrder);

module.exports = router;
