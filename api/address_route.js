const route = require('express');

const { getUserAddresses, addUserAddress, updateUserAddress, deleteUserAddress } = require('../services/address_user_services');

const { addressValidator, updateAddressValidator, deleteAddressValidator, getAddressValidator } = require('../utility/validators/address_validator');

const { protectRouteCheck } = require('../utility/validators/protacted_route_validator');

const { adminPermissions, userPermissions } = require('../utility/helper/user_permisions');

const router = route.Router();

router.route('/').get(protectRouteCheck(
    ...userPermissions
),
    getUserAddresses).post(
        protectRouteCheck(
            ...userPermissions
        ), addressValidator, addUserAddress);

router.route('/:id').put(protectRouteCheck(
    ...userPermissions
), updateAddressValidator, updateUserAddress).delete(protectRouteCheck(
    ...userPermissions
), deleteAddressValidator, deleteUserAddress);

module.exports = router;