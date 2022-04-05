const express = require('express');
const router = express.Router();

const userController = require('../controller/user-controller');

router
.get('/', userController.getAllUsers)
.post('/', userController.createUser)
.patch('/:id', userController.modifyUser)
.delete('/:id', userController.deleteUser);

module.exports = router;
