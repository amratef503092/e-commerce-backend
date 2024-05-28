const express = require('express');
const { verifyEmailValidator, resendOtpValidator, forgotPasswordValidator, resetPasswordValidator } = require('../utility/validators/auth_validator');
const { createUserValidator, } = require('../utility/validators/user_validator');
const { login, getCurrentUser, logout, register, verifyEmail, resendOtp, forgotPassword, resetPassword, changePassword, protectRoute } = require('../services/auth_services');
const { protectRouteCheck } = require('../utility/validators/protacted_route_validator');

const router = express.Router();

router.route('/login').post(login);
router.route('/getProfile').get(protectRouteCheck, getCurrentUser);
router.route('/logout').post(protectRouteCheck, logout);
router.route('/register').post(createUserValidator, register);
router.route('/verify').post(verifyEmailValidator, verifyEmail);
router.route('/resentOtp').post(resendOtpValidator, resendOtp);
router.post("/forgotPassword", forgotPasswordValidator, forgotPassword);
router.put("/resetPassword", resetPasswordValidator, resetPassword);
router.put("/changePassword", protectRouteCheck, changePassword);

module.exports = router;        