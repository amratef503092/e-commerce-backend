const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validator_middleware');


exports.getSubCategoryValidator =
    [
        check('id').isMongoId().withMessage('Invalid subcategory id'),
        validatorMiddleware
    ];
exports.createSubCategoryValidator =
    [
        check('name').isAlpha().withMessage('Subcategory name must be a string').isLength([
            { min: 3, max: 30 }
        ]).withMessage('Subcategory name must be between 3 to 30 characters'),
        check('categoryId').isMongoId().withMessage('Invalid category id'),
        validatorMiddleware
    ]  