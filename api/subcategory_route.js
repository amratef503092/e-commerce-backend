
const express = require('express');

const { createSubCategoryValidator } = require('../utility/validators/sub_category_validator');
const { updateSubCategory, deleteSubCategory, setCategoryId, createSubCategory, getSubCategories, getSubCategory, getSubCategoriesByCategory } = require("../services/subCategort_services");

// mergeParams: true is used to merge the params from the parent router
const router = express.Router({
    mergeParams: true
});


router.route('/').get(getSubCategories)
    .post
    (setCategoryId,
        createSubCategoryValidator
        , createSubCategory);

router.route('/:id').get(getSubCategory).
    delete(deleteSubCategory).
    put(updateSubCategory);

router.route('/category/:id').
    get(getSubCategoriesByCategory);

module.exports = router;
