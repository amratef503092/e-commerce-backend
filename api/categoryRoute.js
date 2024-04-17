const express = require('express');
const categoryServices = require('../services/category_services');

const router = express.Router();
const { getCategoryValidator, createCategoryValidator } = require('../utility/validators/category_validator');
// get all categories post categories;
const subcategoriesRoute = require('./subcategory_route');

router.route('/').get(categoryServices.getCategories).post(
    createCategoryValidator
    , categoryServices.createCategory);
router.route('/:id').get(
    getCategoryValidator,
    categoryServices.getSpacifCategory).put(categoryServices.updateCategory).delete(categoryServices.deleteCategory);


// get subcategories by category id
router.use('/:id/subcategories', subcategoriesRoute);

module.exports = router;

