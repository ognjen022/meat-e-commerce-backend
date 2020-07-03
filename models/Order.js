const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 100,
  },
  customerLastName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 100,
  },
  customerEmail: {
    type: String,
    trim: true,
    required: true,
    maxlength: 100,
  },
  customerPhone: {
    type: String,
    trim: true,
    required: true,
    maxlength: 100,
  },
  customerAddress: {
    type: String,
    trim: true,
    required: true,
    maxlength: 100,
  },
  customerZip: {
    type: Number,
    trim: true,
    required: true,
    maxlength: 100,
  },
  customerAdditionalInfo: {
    type: String,
    trim: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  customerProductsOrder: [
    {
      title: String,
      image: String,
      description: String,
      price: Number,
      amount: Number,
    },
  ],
});

module.exports = mongoose.model('Order', OrderSchema);
