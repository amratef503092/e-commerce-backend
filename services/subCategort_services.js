

const SubCategoryModel = require('../models/sub_category_model');
const { deleteOne, updateOne, createOne, getOne, getAll } = require('./handlersFactory');

exports.setCategoryId = (req, res, next) => {
    if (!req.body.categoryId) {
        req.body.categoryId = req.params.id;
    }
    next();
};

exports.createSubCategory = createOne(SubCategoryModel);
exports.getSubCategories = getAll(SubCategoryModel);

exports.deleteSubCategory = deleteOne(SubCategoryModel);

exports.updateSubCategory = updateOne(SubCategoryModel);

exports.getSubCategory = getOne(SubCategoryModel);



