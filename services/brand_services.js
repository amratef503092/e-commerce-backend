const Brand = require('../models/brand_model');
const { deleteOne, updateOne, createOne, getOne, getAll } = require('./handlersFactory');

// @desc    Get list of brands
// @route   GET /api/v1/brands
// @access  Public
exports.getBrands = getAll(Brand);

// @desc    Get specific brand by id
// @route   GET /api/v1/brands/:id
// @access  Public
exports.getBrand = getOne(Brand);

// @desc    Create brand
// @route   POST  /api/v1/brands
// @access  Private
exports.createBrand = createOne(Brand);

// @desc    Update specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private
exports.updateBrand = updateOne(Brand);

// @desc    Delete specific brand
// @route   DELETE /api/v1/brands/:id
// @access  Private
exports.deleteBrand = deleteOne(Brand);


