const express = require('express');
const { authaticationValidator, verifyEmailValidator } = require('../utility/validators/auth_validator');
const { createUserValidator, } = require('../utility/validators/user_validator');
const { login, getCurrentUser, logout, register, verifyEmail } = require('../services/auth_services');

const router = express.Router();

router.route('/login').post(login);
router.route('/getProfile').get(authaticationValidator, getCurrentUser);
router.route('/logout').post(authaticationValidator, logout);
router.route('/register').post(createUserValidator, register);
router.route('/verify').post(verifyEmailValidator, verifyEmail);

module.exports = router;