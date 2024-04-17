

const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validator_middleware');

// create product validator 
exports.createProductValidator =
    [
        check('title').notEmpty().withMessage('Title is required').isLength({ min: 3 }).withMessage('Title is too short').isLength({ max: 100 }).withMessage('Title is too long'),
        check('slug').notEmpty().withMessage('Slug is required').isLength({ min: 3 }).withMessage('Slug is too short').isLength({ max: 100 }).withMessage('Slug is too long').isLowercase().withMessage('Slug must be lowercase'),
        check('description').notEmpty().withMessage('Description is required').isLength({ min: 3 }).withMessage('Description is too short').isLength({ max: 2000 }).withMessage('Description is too long'),
        check('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('Price must be a number'),
        check('discount.type').notEmpty().withMessage('Discount type is required').isIn(['fixed', 'percentage']).withMessage('Discount type must be fixed or percentage'),
        check('discount.value').notEmpty().withMessage('Discount value is required').isNumeric().withMessage('Discount value must be a number'),
        check('stock').notEmpty().withMessage('Stock is required').isNumeric().withMessage('Stock must be a number'),
        check('imageCoer').notEmpty().withMessage('Image Coer is required').isURL().withMessage('Image Coer must be a URL'),
        check('images').notEmpty().withMessage('Images is required').isArray().withMessage('Images must be an array'),
        check('category').notEmpty().withMessage('Category is required').isMongoId().withMessage('Category must be a valid MongoId'),
        check('subCategory').notEmpty().withMessage('Sub Category is required').isMongoId().withMessage('Sub Category must be a valid MongoId'),
        check('brand').notEmpty().withMessage('Brand is required').isMongoId().withMessage('Brand must be a valid MongoId'),
        validatorMiddleware
    ];

// update product validator 

exports.updateProductValidator =
    [
        check('id').notEmpty().withMessage('Product id is required').isMongoId().withMessage('Product id must be a valid MongoId'),
        validatorMiddleware
    ];

// delete product validator

exports.deleteProductValidator =
    [
        check('id').notEmpty().withMessage('Product id is required').isMongoId().withMessage('Product id must be a valid MongoId'),
        validatorMiddleware
    ];


