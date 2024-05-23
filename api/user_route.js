
const express = require('express');
const { createUserValidator, updateUserValidator, deleteUserValidator, getUserValidator } = require('../utility/validators/user_validator');

const userService = require('../services/user_services');

const router = express.Router();


router.route('/').post(createUserValidator, userService.createUser).get(userService.getAllUsers);
router.route('/:id').get(getUserValidator, userService.getOneUserInfo).put(updateUserValidator, userService.updateUser).
    delete(deleteUserValidator, userService.deleteUser);

module.exports = router;