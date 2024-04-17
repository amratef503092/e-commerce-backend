
const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validator_middleware');

exports.getCategoryValidator =
    [
        check('id').isMongoId().withMessage('Invalid category id'),
        validatorMiddleware
    ];

exports.createCategoryValidator =
    [
        check('name').isAlpha().withMessage('Category name must be a string'),
        validatorMiddleware
    ];