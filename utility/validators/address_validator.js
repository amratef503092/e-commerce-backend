const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validator_middleware');

exports.addressValidator =
    [
        // check('user').notEmpty().withMessage('User required'),
        check('type').notEmpty().withMessage('Type required'),
        check('lat').notEmpty().withMessage('Latitude required'),
        check('long').notEmpty().withMessage('Longitude required'),
        check('address').notEmpty().withMessage('Address required'),
        validatorMiddleware,
    ];

exports.updateAddressValidator =
    [
        check('type').notEmpty().withMessage('Type required'),
        check('lat').notEmpty().withMessage('Latitude required'),
        check('long').notEmpty().withMessage('Longitude required'),
        check('address').notEmpty().withMessage('Address required'),
        validatorMiddleware,
    ];

exports.deleteAddressValidator =
    [
        check('id').notEmpty().withMessage('Id required'),
        validatorMiddleware,
    ];

exports.getAddressValidator =
    [
        check('id').notEmpty().withMessage('Id required'),
        validatorMiddleware,
    ];
