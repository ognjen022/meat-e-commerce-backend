const mongoose = require('mongoose');
const Order = require('../models/Order');

// @desc    Get all orders
// @route   GET /orders
// @access  Private
exports.getOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });

  if (orders.length === 0) {
    return res.status(404).json({ msg: 'No orders in the database.' });
  }

  res.status(200).json(orders);
};

// @desc    Get single order
// @route   GET /orders/:id
// @access  Private
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ msg: `No order found with the id ${req.params.id}` });
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// @desc    Create order
// @route   POST /orders/
// @access  Private
exports.createOrder = async (req, res) => {
  const {
    address,
    body,
    email,
    name,
    lastname,
    number,
    zip,
    totalPrice,
    productsOrdered,
  } = req.body;

  const newOrder = {
    customerName: name,
    customerLastName: lastname,
    customerEmail: email,
    customerPhone: number,
    customerAddress: address,
    customerZip: zip,
    customerAdditionalInfo: body,
    totalPrice,
    customerProductsOrder: productsOrdered,
  };

  try {
    const order = await Order.create(newOrder);

    res.status(201).json({ order });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

// @desc    Update order
// @route   PUT /orders/:id
// @access  Private
exports.updateOrder = async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ msg: `No order found with the id ${req.params.id}` });
    }

    order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: order });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete order
// @route   DELETE /orders/:id
// @access  Private
exports.deleteOrder = async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ msg: `No order found with the id ${req.params.id}` });
    }

    order.remove();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
