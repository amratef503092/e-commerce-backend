
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const SubCategoryModel = require('../models/sub_category_model');
const apiResponse = require('../utility/api_resource');
const ApiError = require('../utility/error');

exports.setCategoryId = (req, res, next) => {
    if (!req.body.categoryId) {
        req.body.categoryId = req.params.id;
    }
    next();
};

exports.createSubCategory = asyncHandler(
    async (req, res, next) => {
        console.log(req.body);
        if (!req.body.categoryId) req.body.categoryId = req.params.id;
        const { name, categoryId } = req.body;
        const slug = slugify(name);
        try {
            const subCategory = await SubCategoryModel.create({ name, slug, category: categoryId });
            res.status(201).json(subCategory);
        } catch (error) {
            if (error.code === 11000) {
                res.status(400).json({ message: 'Subcategory already exists' });
            } else {
                next(error);
            }
        }

    },
);

exports.getSubCategories = asyncHandler(
    async (req, res, next) => {
        // const { page = 1, limit = 10 } = req.query;
        // const skip = (page - 1) * limit;
        let filterObj = {};
        if (req.params.id) {
            filterObj = { category: req.params.id };
        }
        const subCategories = await SubCategoryModel.find(filterObj).select('name').select('slug').populate('category', 'name');
        apiResponse.apiResponse(res, 200, 'Sub Categories', subCategories);
    },
);

exports.deleteSubCategory =
    asyncHandler(
        async (req, res, next) => {
            const { id } = req.params;
            const subCategory = await SubCategoryModel.findByIdAndDelete(id);
            if (!subCategory) {
                return next(new ApiError(404, `Subcategory not found ${id}`));
            }
            res.status(200).json({
                status: 'success',
                status_code: 200,
                message: 'Subcategory deleted successfully'
            });
        }
    );

exports.updateSubCategory = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        const { name, categoryId } = req.body;
        const slug = slugify(name);
        const subCategory = await SubCategoryModel.findByIdAndUpdate(id, { name, slug, category: categoryId }, { new: true });
        if (!subCategory) {
            return next(new ApiError(404, `Subcategory not found ${id}`));
        }
        res.status(200).json({
            status: 'success',
            status_code: 200,
            data: subCategory
        });
    }
);



