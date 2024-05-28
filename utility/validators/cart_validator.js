const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validator_middleware');

exports.addToCartValidator =
    [

        // check('product').notEmpty().withMessage('Product required'),
        // check('productId').isMongoId().withMessage('Invalid product id'),
        validatorMiddleware,
    ];
