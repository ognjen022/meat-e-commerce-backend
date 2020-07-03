const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title'],
    maxlength: 100,
  },
  description: {
    type: String,
    required: [true, 'Please add a product description'],
  },
  img: {
    type: String,
    required: [true, 'Please add a product image'],
  },
  price: {
    type: Number,
    min: 1,
    required: [true, 'Please add a product price'],
  },
});

module.exports = mongoose.model('Product', ProductSchema);
