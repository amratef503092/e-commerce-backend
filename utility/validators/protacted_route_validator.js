
const asyncHandler = require('express-async-handler');
const ApiError = require('../error');
const UserModel = require('../../models/users_model');
const { TokenService } = require("../helper/functions");

exports.protectRouteCheck = (...roules) => asyncHandler(async (req, res, next,) => {
    console.log(...roules);
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
        return next(new ApiError(404, 'unauthorized access'));
    }
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    if (TokenService.checkToken(token)) {
        return next(new ApiError(404, "unauthorized access"));
    }
    const decode = TokenService.decodeToken(req.headers.authorization);
    if (!decode) {
        return next(new ApiError(404, 'unauthorized access'));
    }
    const user = await UserModel.findById(
        decode.id
    );
    if (!user) {
        return next(new ApiError(404, 'unauthorized access'));
    }
    if (!user.online) {
        return next(new ApiError(404, 'unauthorized access'));
    }
    if (!user.verified) {
        return next(new ApiError(404, 'unauthorized access please verify your email'));
    }
    console.log(user);
    req.user = user;
    console.log(roules.includes(user.role));

    if (!roules.includes(user.role)) {
        return next(new ApiError(404, 'unauthorized access'));
    }
    next();
    // pass to next  middleware
});

