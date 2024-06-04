const asyncHandler = require('express-async-handler');
const ApiError = require('../utility/error');
const ApiFeatures = require('../utility/apiFeatures');
const { apiResponse } = require('../utility/api_resource');

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }

    apiResponse(res, 204, 'Document deleted', null);
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      return next(
        new ApiError(`No document for this id ${req.params.id}`, 404)
      );
    }
    apiResponse(res, 200, 'Document Updated', document);

  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {

    const newDoc = await Model.create(req.body);
    apiResponse(res, 200, 'Document created', newDoc);

  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    apiResponse(res, 200, 'Document found', document);

  });

exports.getAll = (Model, modelName = '') =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    // Build query
    const documentsCounts = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginate(documentsCounts)
      .filter()
      .search(modelName)
      .limitFields()
      .sort();

    // Execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;


    apiResponse(res, 200, 'Documents retrieved', {
      documents,
      paginationResult,
    });

  });