
const slugify = require('slugify');
const asyncHandler = require('express-async-handler')
const productModel = require('../models/product_model');
const categoryModel = require('../models/category_model');
const subCategoryModel = require('../models/sub_category_model');
const brandModel = require('../models/brand_model');
const ApiError = require('../utility/error')
const apiResponse = require('../utility/api_resource');







// desc : get all products 
// route : GET /api/v1/products
// access : public



exports.getProducts = asyncHandler(
    async (req, res) => {

        page = parseInt(req.query.page, 10) || 1;
        limit = parseInt(req.query.limit, 10) || 4;
        skip = (page - 1) * limit;
        currentPage = page;

        numberOfPages = Math.ceil(await productModel.countDocuments() / limit);
        const products = await productModel.find(
            {

            }
        ).skip(skip).limit(limit);
        apiResponse.apiResponse(res, 200, 'success', products);
    }
);

// desc :  create product 
// route  : POST /api/v1/products
// access : private -> admin only

exports.createProduct = asyncHandler(
    async (req, res) => {
        req.body.slug = slugify(req.body.name);

        const product = await productModel.create(req.body);

        apiResponse.apiResponse(res, 200, 'success', product);
    }
);

// desc : update product
// route : PUT /api/v1/products/:id
// access : private -> admin only

exports.updateProduct = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;

        const product = await productModel.findByIdAndUpdate(id, req.body,
            new { new: true, runValidators: true });

        if (!product) {
            return next(new ApiError(404, `Product not found ${id}`));
        }
        apiResponse.apiResponse(res, 200, 'success', product);

    }
);

// desc : delete product
// route : DELETE /api/v1/products/:id
// access : private -> admin only

exports.deleteProduct = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;

        const product = await productModel.findByIdAndDelete(id);

        if (!product) {
            return next(new ApiError(404, `Product not found ${id}`));
        }
        apiResponse.apiResponse(res, 200, 'success', product);
    }
);