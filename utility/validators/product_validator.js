

const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validator_middleware');
const categoryModel = require('../../models/category_model');
const subCategoryModel = require('../../models/sub_category_model');
// create product validator 
exports.createProductValidator =
    [
        check('name').notEmpty().withMessage('Title is required').isLength({ min: 3 }).withMessage('Title is too short').isLength({ max: 100 }).withMessage('Title is too long'),
        // check('slug').notEmpty().withMessage('Slug is required').isLength({ min: 3 }).withMessage('Slug is too short').isLength({ max: 100 }).withMessage('Slug is too long').isLowercase().withMessage('Slug must be lowercase'),
        check('description').notEmpty().withMessage('Description is required').isLength({ min: 3 }).withMessage('Description is too short').isLength({ max: 2000 }).withMessage('Description is too long'),
        check('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('Price must be a number'),
        check('discount.type').notEmpty().withMessage('Discount type is required').isIn(['fixed', 'percentage']).withMessage('Discount type must be fixed or percentage'),
        check('discount.value').notEmpty().withMessage('Discount value is required').isNumeric().withMessage('Discount value must be a number'),
        check('stock').notEmpty().withMessage('Stock is required').isNumeric().withMessage('Stock must be a number'),
        check('imageCover').notEmpty().withMessage('Image Coer is required').isURL().withMessage('Image Coer must be a URL'),
        check('images').notEmpty().withMessage('Images is required').isArray().withMessage('Images must be an array'),
        check('category').notEmpty().withMessage('Category is required').isMongoId().withMessage('Category must be a valid MongoId').
            custom(
                async (value) => {
                    const category = await categoryModel.findById(value);
                    if (!category) {
                        return Promise.reject(Error('Category not found'));
                    }
                }
            ),
        // what i want to do 

        check('subCategory').optional().isMongoId().
            withMessage('Sub Category must be a valid MongoId')
            .custom((subcategoriesIds) =>
                subCategoryModel.find({ _id: { $exists: true, $in: subcategoriesIds } }).then(
                    (result) => {
                        if (result.length < 1 || result.length !== subcategoriesIds.length) {
                            return Promise.reject(new Error(`Invalid subcategories Ids`));
                        }
                    }
                )
            )
            // here he use req to get category from req.body
            // value is subcategories ids in req.body
            .custom((val, { req }) =>
                subCategoryModel.find({ category: req.body.category }).then(
                    (subcategories) => {
                        const subCategoriesIdsInDB = [];
                        subcategories.forEach((subCategory) => {
                            subCategoriesIdsInDB.push(subCategory._id.toString());
                        });
                        // check if subcategories ids in db include subcategories in req.body (true)
                        const checker = (target, arr) => target.every((v) => arr.includes(v));
                        if (!checker(val, subCategoriesIdsInDB)) {
                            return Promise.reject(
                                new Error(`subcategories not belong to category`)
                            );
                        }
                    }
                )
            ),

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


