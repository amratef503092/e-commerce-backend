
const Category = require('../models/category_model');
const { deleteOne, updateOne, createOne, getOne, getAll } = require('./handlersFactory');

// desc : get all categories
// route : GET /api/v1/categories
// access : public
exports.getCategories = getAll(Category);

// desc : get spacif category by id
// route : POST /api/v1/categories/category
// access : public

exports.getSpacifCategory = getOne(Category);
// desc : create new category
// route : POST /api/v1/categories/postCategory
// access : private -> admin only
exports.createCategory = createOne(Category);

// desc : update category
// route : PATCH /api/v1/categories/:id

exports.updateCategory = updateOne(Category);

exports.deleteCategory = deleteOne(Category);

