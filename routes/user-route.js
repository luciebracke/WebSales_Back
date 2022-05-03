const express = require('express');
const router = express.Router();

const userController = require('../controller/user-controller');

const authentification = require('../middleware/authenticate-middleware');
const isUserAdmin = require('../middleware/admin-middleware');


router
.get('/', userController.get_all_users)
.post('/register', userController.create_user)
.patch('/:id', [authentification, isUserAdmin],userController.modify_user)
.delete('/:id', [authentification, isUserAdmin], userController.delete_user)
.post('/login', userController.user_login);

module.exports = router;
