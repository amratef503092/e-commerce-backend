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

    exports.verifyEmailValidator = [
        check('email').isEmail().withMessage('Invalid email format'),
        check('otp').notEmpty().withMessage('OTP required'),
        validatorMiddleware,
    ];