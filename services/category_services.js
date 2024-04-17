
const slugify = require('slugify');
const asyncHandler = require('express-async-handler')
const ApiError = require('../utility/error')
const Category = require('../models/category_model');

// desc : get all categories
// route : GET /api/v1/categories
// access : public
exports.getCategories = asyncHandler(
    async (req, res) => {
        page = parseInt(req.query.page, 10) || 1;
        limit = parseInt(req.query.limit, 10) || 4;
        skip = (page - 1) * limit;
        currentPage = page;

        numberOfPages = Math.ceil(await Category.countDocuments() / limit);
        const categories = await Category.find().skip(skip).limit(limit);
        res.status(200).json({
            status: 'success',
            count: categories.length,
            currentPage: currentPage,
            numberOfPages: numberOfPages,
            status_code: 200,
            data: categories
        });
    }
);

// desc : get spacif category by id
// route : POST /api/v1/categories/category
// access : public

exports.getSpacifCategory = asyncHandler(
    async (req, res, next) => {


        const { id } = req.params;

        const category = await Category.findById(id);

        if (!category) {
            return next(new ApiError(404, `Category not found ${id}`));
        }
        res.status(200).
            json({
                status: 'success',
                status_code: 200,
                data: category
            })
    }
);

// desc : create new category
// route : POST /api/v1/categories/postCategory
// access : private -> admin only
exports.createCategory = asyncHandler(
    async (req, res) => {

        const { name } = req.body;
        const slug = slugify(name);

        const category = await Category.create({
            name: name,
            slug: slug,
            image: req.body.image
        });
        res.status(201).json({
            status: 'success',
            data: category
        });

    }
);

// desc : update category
// route : PATCH /api/v1/categories/:id

exports.updateCategory = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        console.log(id);
        const { name } = req.body;

        const category = await Category.findByIdAndUpdate({ _id: id }, { name },
            {
                new: true
            });

        if (!category) {


            return next(new ApiError(404, `Category not found ${id}`));

        }
        res.status(200).json({
            category
        });


    }
);

exports.deleteCategory = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return next(new ApiError(404, `Category not found ${id}`));
        }

        res.status(200).
            json({
                status: 'success',
                data: null
            });
    }
);

