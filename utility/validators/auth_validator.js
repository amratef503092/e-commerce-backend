const jwt = require('jsonwebtoken');
const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validator_middleware');

exports.loginValidator = [
    check('email').isEmail().withMessage('Invalid email format'),
    check('password').notEmpty().withMessage('Password required'),
    validatorMiddleware,
];

exports.authaticationValidator =
    [
        check('Authorization').notEmpty().withMessage('Token required').custom((value) => {
            try {
                const decode = jwt.verify(value.split(' ')[1], process.env.JWT_SECRET);
                console.log(decode);
                return true;
            } catch (error) {
                throw new Error('Invalid token');
            }
        }),

        validatorMiddleware,
    ];

exports.verifyEmailValidator =
    [
        check('email').isEmail().withMessage('Invalid email format'),
        check('otp').notEmpty().withMessage('OTP required'),
        validatorMiddleware,
    ];

exports.resendOtpValidator = [
    check('email').isEmail().withMessage('Invalid email format'),
    validatorMiddleware,
];

exports.forgotPasswordValidator = [
    check('email').isEmail().withMessage('Invalid email format'),
    validatorMiddleware,
];

exports.resetPasswordValidator = [
    check('email').isEmail().withMessage('Invalid email format'),
    check('password').notEmpty().withMessage('Password required'),
    check('otp').notEmpty().withMessage('OTP required'),
    validatorMiddleware,
];

exports.changePasswordValidator = [
    check('oldPassword').notEmpty().withMessage('Old password required'),
    check('newPassword').notEmpty().withMessage('New password required').custom((value, { req }) => {
        if (value === req.body.oldPassword) {
            throw new Error('New password must be different from old password');
        }
        return true;
    }),
    validatorMiddleware,
];