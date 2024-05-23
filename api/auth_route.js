const express = require('express');
const { authaticationValidator, verifyEmailValidator, resendOtpValidator, forgotPasswordValidator, resetPasswordValidator } = require('../utility/validators/auth_validator');
const { createUserValidator, } = require('../utility/validators/user_validator');
const { login, getCurrentUser, logout, register, verifyEmail, resendOtp, forgotPassword, resetPassword, changePassword } = require('../services/auth_services');

const router = express.Router();

router.route('/login').post(login);
router.route('/getProfile').get(authaticationValidator, getCurrentUser);
router.route('/logout').post(authaticationValidator, logout);
router.route('/register').post(createUserValidator, register);
router.route('/verify').post(verifyEmailValidator, verifyEmail);
router.route('/resentOtp').post(resendOtpValidator, resendOtp);
router.post("/forgotPassword", forgotPasswordValidator, forgotPassword);
router.put("/resetPassword", resetPasswordValidator, resetPassword);
router.put("/changePassword", authaticationValidator, changePassword);

module.exports = router;        