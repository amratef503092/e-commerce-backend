
const express = require('express');
const cartServices = require('../services/cart_services');
const { addToCartValidator } = require('../utility/validators/cart_validator');
const { protectRouteCheck } = require('../utility/validators/protacted_route_validator');

const router = express.Router();

router.route('/').
    get(protectRouteCheck, cartServices.getCartUser).
    post(protectRouteCheck, addToCartValidator,
        cartServices.addProductToCart);

router.route('/deleteProduct/:id').
    delete(protectRouteCheck, cartServices.deleteProductFromCart);

router.delete('/deleteAllProduct', protectRouteCheck, cartServices.deleteCart);

router.post('/checkout', protectRouteCheck, cartServices.checkout);
router.get('/checkout', protectRouteCheck, cartServices.getCheckoutAllOrder);



module.exports = router;