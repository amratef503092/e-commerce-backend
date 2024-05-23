
const UserModel = require('../models/users_model');


const { deleteOne, updateOne, createOne, getOne, getAll } = require('./handlersFactory');


// @desc    Get all users
// @route   GET /api/v1/users:id
// @access  Private
exports.getOneUserInfo = getOne(UserModel);

// @desc    Get one user info
// @route   GET /api/v1/user
// @access  Public

exports.getAllUsers = getAll(UserModel);


// @desc    Create user
// @route   POST /api/v1/users
// @access  Private
exports.createUser = createOne(UserModel);

// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Private
exports.updateUser = updateOne(UserModel);

// @desc    Delete user

// @route   DELETE /api/v1/users/:id
// @access  Private
exports.deleteUser = deleteOne(UserModel);
