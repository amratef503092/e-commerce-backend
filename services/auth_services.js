const ApiError = require('../utility/error');
const jwt = require('jsonwebtoken');

const asyncHandler = require('express-async-handler');
const apiResource = require('../utility/api_resource');
const UserModel = require('../models/users_model');
const otpModel = require('../models/otp_model');
const { TokenService } = require("../utility/helper/functions");

const { check } = require('express-validator');

function createOtp(email) {
    // generate otp 
    const otpCode = Math.floor(1000 + Math.random() * 9000);
    // save otp in database
    const otpData = {
        email: email,
        otp: otpCode,
    }

    otpModel.create(otpData);
    // send email to user
    console.log(otpCode);

    return otpCode;



};


// login 
// @desc    login user
// @route   POST /api/v1/auth/login
// @access  Public

exports.login = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ApiError(400, 'Please provide email and password'));
    }

    const user = await UserModel.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password, user.password))) {
        return next(new ApiError(401, 'Invalid email or password'));
    }
    // generate token
    const token = user.generateToken();
    user.online = true;
    await user.updateOne(user);
    const data =
    {
        user: user,
        token: token
    }
    apiResource.apiResponse(res, 200, "success", data);
});


// get current user

// @desc    get current user
// @route   GET /api/v1/auth/getProfile
// @access  Private
exports.getCurrentUser = asyncHandler(async (req, res, next) => {
    const userID = TokenService.getIdFromToken(req.headers.authorization);
    if (!userID) {
        return next(new ApiError(400, 'Invalid token'));
    }
    const user = await UserModel.findById(userID);
    if (!user || !user.online) {
        return next(new ApiError(404, 'unauthorized access'));
    }
    apiResource.apiResponse(res, 200, "success", user);
});

// logout

// @desc    logout user
// @route   POST /api/v1/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (TokenService.checkToken(token)) {
        return next(new ApiError(404, "unauthorized access"));
    }
    const user = await UserModel.findById(TokenService.getIdFromToken(req.headers.authorization));
    if (!user) {
        return next(new ApiError(404, 'unauthorized access'));
    }
    user.online = false;
    await user.updateOne(user);
    apiResource.apiResponse(res, 200, "success", "logout successfully");
});

// register
// @desc    register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {

    const user = await UserModel.create(req.body);
    if (!user) {
        return next(new ApiError(400, 'invalid data'));
    }
    createOtp(user.email);
    // send  email to user to verify email 
    return apiResource.apiResponse(res, 201, "success check email", user);

});

// verify email

exports.verifyEmail = asyncHandler(async (req, res, next) => {
    const { email, otp } = req.body;
    const otpData = await otpModel.findOne({ email: email });
    if (!otpData) {
        return next(new ApiError(404, 'invalid email'));
    }
    if (otpData.otp !== otp) {
        return next(new ApiError(404, 'invalid otp'));
    }
    if (otpData.createdAt + 60000 < Date.now()) {
        return next(new ApiError(404, 'otp expired'));
    }

    if (otpData.otp === otp) {
        const user = await UserModel.findOneAndUpdate({ email: email }, { emailVerified: true });

        if (!user) {
            return next(new ApiError(404, 'invalid email'));
        }

        const data =
        {
            user: user,
            token: TokenService.generateToken({ id: user.id }),
            message: "email verified successfully"
        }
        // remove otp 

        await otpData.deleteOne(otpData);

        return apiResource.apiResponse(res, 200, "success", data);
    }

});





