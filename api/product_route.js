const express = require('express');

const productServices = require('../services/product_services');

const router = express.Router();

const {createProductValidator  , updateProductValidator , deleteProductValidator} = require('../utility/validators/product_validator');


router.route('/').get(productServices.getProducts).
    post(createProductValidator, 
    productServices.createProduct);

router.route('/:id').put( updateProductValidator,productServices.updateProduct).
delete( deleteProductValidator, productServices.deleteProduct).get(productServices.getProducts);
    