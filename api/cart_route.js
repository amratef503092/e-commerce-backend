
const express = require('express');
const carServices = require('../services/cart_services');
const { addToCartValidator } = require('../utility/validators/cart_validator');
const { protectRouteCheck } = require('../utility/validators/protacted_route_validator');

const router = express.Router();

router.route('/').
    get(protectRouteCheck, carServices.getCartUser).
    post(protectRouteCheck, addToCartValidator,
        carServices.addProductToCart);

module.exports = router;