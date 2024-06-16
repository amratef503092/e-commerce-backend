
const asyncHandler = require('express-async-handler');

const AddressUser = require('../models/user_address_model');
const ApiError = require('../utility/error');
const { apiResponse } = require('../utility/api_resource');


// @desc    Get list of address
// @route   GET /api/v1/address
// @access  Private
exports.getUserAddresses = asyncHandler(async (req, res, next) => {
    const user = req.user;
    const addresses = await AddressUser.find({ user: user.id });
    if (!addresses) {
        return next(new ApiError(`No address found for this user ${user.id}`, 404));
    }
    return apiResponse(res, 200, 'Address found', addresses);
});

// @desc    user add address
// @route   POST /api/v1/address
// @access  Private

exports.addUserAddress = asyncHandler(async (req, res, next) => {
    const user = req.user;
    const { type, lat, long, address } = req.body;
    const newAddress = await AddressUser.create({ user: user.id, type, lat, long, address });
    apiResponse(res, 200, 'Address created', newAddress);
});

// @desc    user update address

// @route   PUT /api/v1/address/:id
// @access  Private
exports.updateUserAddress = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const addressUser = await AddressUser.findById(id);
    if (!addressUser) {
        return next(new ApiError(`No address found for this id ${id}`, 404));
    }
    if (addressUser.user.toString() !== req.user.id.toString()) {
        return next(new ApiError(`Not authorized to update this address`, 401));
    }
    const updatedAddress = await AddressUser.findByIdAndUpdate(id, req.body, { new: true });
    return apiResponse(res, 200, 'Address updated', updatedAddress);
}
);

// @desc    user delete address
// @route   DELETE /api/v1/address/:id
// @access  Private
exports.deleteUserAddress = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const addressUser = await AddressUser.findById(id);
    if (!addressUser) {
        return next(new ApiError(`No address found for this id ${id}`, 404));
    }
    if (addressUser.user.toString() !== req.user.id.toString()) {
        return next(new ApiError(`Not authorized to delete this address`, 401));
    }
    await AddressUser.findByIdAndDelete(id);
    return apiResponse(res, 204, 'Address deleted', null);
});


