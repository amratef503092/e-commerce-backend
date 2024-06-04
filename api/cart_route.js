
const express = require('express');
const cartServices = require('../services/cart_services');
const { addToCartValidator } = require('../utility/validators/cart_validator');
const { protectRouteCheck } = require('../utility/validators/protacted_route_validator');
const { userPermissions } = require('../utility/helper/user_permisions');

const router = express.Router();

router.route('/').
    get(protectRouteCheck(
        ...userPermissions
    ), cartServices.getCartUser).
    post(
        protectRouteCheck(...userPermissions),
        addToCartValidator,
        cartServices.addProductToCart);

router.route('/deleteProduct/:id').
    delete(protectRouteCheck(
        ...userPermissions
    ), cartServices.deleteProductFromCart);

router.delete('/deleteAllProduct',
    protectRouteCheck(
        ...userPermissions
    ), cartServices.deleteCart);

router.post('/checkout',
    protectRouteCheck(...userPermissions
    ), cartServices.checkout);
router.get('/checkout', protectRouteCheck
    (
        ...userPermissions
    ), cartServices.getCheckoutAllOrder);



module.exports = router;