
const productModel = require('../models/product_model');
const { deleteOne, updateOne, createOne, getOne, getAll } = require('./handlersFactory');


// desc : get spacif product by id
// route : GET /api/v1/products/:id
// access : public

exports.getProduct = getOne(productModel);

// desc : get all products 
// route : GET /api/v1/products
// access : public

exports.getProducts = getAll(productModel);

// desc :  create product 
// route  : POST /api/v1/products
// access : private -> admin only

exports.createProduct = createOne(productModel);
// desc : update product
// route : PUT /api/v1/products/:id
// access : private -> admin only

exports.updateProduct = updateOne(productModel);
// desc : delete product
// route : DELETE /api/v1/products/:id
// access : private -> admin only

exports.deleteProduct = deleteOne(productModel);