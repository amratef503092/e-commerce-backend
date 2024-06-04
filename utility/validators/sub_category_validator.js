const { check } = require('express-validator');
const CategoryModel = require('../../models/category_model');

const slugify = require('slugify');

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
        check('category').isMongoId().withMessage('Invalid category id').
            custom(async (val, { req }) => {
                const category = await CategoryModel.findById(val);
                if (!category) {
                    return Promise.reject
                        (
                            new Error('Category not found')
                        );
                }
                req.body.slug = slugify(val);

                return true;
            }),
        validatorMiddleware
    ]  