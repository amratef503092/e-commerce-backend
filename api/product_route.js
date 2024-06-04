const express = require('express');

const productServices = require('../services/product_services');
const { adminPermissions } = require('../utility/helper/user_permisions');

const router = express.Router(
    { mergeParams: true }
);
const { protectRouteCheck } = require('../utility/validators/protacted_route_validator');

const { createProductValidator, updateProductValidator, deleteProductValidator } = require('../utility/validators/product_validator');


router.route('/').get(productServices.getProducts).
    post
    (
        protectRouteCheck
            (
                ...adminPermissions
            ),
        createProductValidator,
        productServices.createProduct
    );

router.route('/:id').
    put(
        protectRouteCheck
        (
            ...adminPermissions
        ),
        updateProductValidator, 
        productServices.updateProduct).
    delete(
        protectRouteCheck
        (
            ...adminPermissions
        ),
        deleteProductValidator,
        productServices.deleteProduct)
    .get(productServices.getProduct);

module.exports = router;
