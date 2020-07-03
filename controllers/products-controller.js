const mongoose = require('mongoose');
const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /products
// @access  Public
exports.getProducts = async (req, res) => {
  const products = await Product.find();

  if (products.length === 0) {
    return res.status(404).json({ msg: 'No products in the database.' });
  }

  res.status(200).json(products);
};

// @desc    Get single product
// @route   GET /products/:id
// @access  Public
exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res
      .status(404)
      .json({ msg: `No product found with the id ${req.params.id}` });
  }

  res.status(200).json(product);
};

// @desc    Create product
// @route   POST /products/
// @access  Private
exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product,
  });
};

// @desc    Update product
// @route   PUT /products/:id
// @access  Private
exports.updateProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res
      .status(404)
      .json({ msg: `No product found with the id ${req.params.id}` });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: product });
};

// @desc    Delete product
// @route   DELETE /products/:id
// @access  Private
exports.deleteProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res
      .status(404)
      .json({ msg: `No product found with the id ${req.params.id}` });
  }

  product.remove();

  res.status(200).json({ success: true, data: {} });
};
