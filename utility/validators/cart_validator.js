const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validator_middleware');

const productModel = require('../../models/product_model');

exports.addToCartValidator =
    [

        check('products').notEmpty().withMessage('Products required')
            .isArray().
            withMessage('Products must be an array'),


        validatorMiddleware,
    ];
