const express = require('express');
const router = express.Router();

const userController = require('../controller/user-controller');

router
.get('/', userController.get_all_users)
.post('/', userController.create_user)
.patch('/:id', userController.modify_user)
.delete('/:id', userController.delete_user)
.post('/login', userController.user_login);

module.exports = router;
