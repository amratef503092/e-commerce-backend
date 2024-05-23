const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validator_middleware');

exports.getUserValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),
    validatorMiddleware,
];

exports.createUserValidator = [
    check('name')
        .notEmpty()
        .withMessage('User name required')
        .isLength({ min: 3 })
        .withMessage('Too short User name')
        .isLength({ max: 32 })
        .withMessage('Too long User name'),
    check('email')
        .notEmpty()
        .withMessage('User email required')
        .isEmail()
        .withMessage('Invalid email format'),
    check('password')
        .notEmpty()
        .withMessage('User password required')
        .isLength({ min: 6 })
        .withMessage('Too short password').custom((value, { req }) => {
            console.log(value);
            console.log(req.body.confirmPassword);
            if (value !== req.body.confirmPassword) {
                throw new Error('Password confirmation does not match password');
            }
            // regex for password validation

            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

            if (!passwordRegex.test(value)) {
                throw new Error('Password must contain at least one uppercase letter, one lowercase letter, one number and one special character');
            }
            return true;
        }),
    validatorMiddleware,
];

exports.updateUserValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),
    check('name')
        .notEmpty()
        .withMessage('User name required')
        .isLength({ min: 3 })
        .withMessage('Too short User name')
        .isLength({ max: 32 })
        .withMessage('Too long User name'),
    check('email')
        .notEmpty()
        .withMessage('User email required')
        .isEmail()
        .withMessage('Invalid email format'),
    check('password')
        .notEmpty()
        .withMessage('User password required')
        .isLength({ min: 6 })
        .withMessage('Too short password').custom((value, { req }) => {
            if (value !== req.body.confirmPassword) {
                throw new Error('Password confirmation does not match password');
            }
            // regex for password validation

            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

            if (!passwordRegex.test(value)) {
                throw new Error('Password must contain at least one uppercase letter, one lowercase letter, one number and one special character');
            }
            return true;
        }),
    validatorMiddleware,
];

exports.deleteUserValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),
    validatorMiddleware,
];

