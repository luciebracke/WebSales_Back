const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');

const authentification = require('../middleware/authenticate-middleware');
const isUserAdmin = require('../middleware/admin-middleware');

router
.get('/', userController.get_all_users)
.post('/register', userController.create_user)
.post('/login', userController.user_login)
.patch('/:id', [authentification, isUserAdmin],userController.modify_user)
.delete('/:id', authentification, userController.delete_user);

/**
 * @swagger
 * 
 * paths:
 *   /api/users:
 *     get:
 *       summary: Gets all users
 *       tags:
 *         - Users
 *       parameters:
 *         - name: Authorization
 *           in: header
 *           description: Bearer token
 *           required: true
 *           type: string
 *           format: string        
 * 
 *       responses:
 *         200:
 *           description: OK
 *         500:
 *          description: Internal server error
 * 
 *   api/user/register:
 *     post:
 *       tags:
 *         - Users
 *       summary: Register a new user
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 passwordCheck:
 *                   type: string
 *             example:
 *              firstName: "John"
 *              lastName: "Doe"
 *              email: "john.doe@gmail.com"
 *              password: "password"
 *              passwordCheck: "password"           
 *          
 *       responses:
 *         201:
 *           description: Created
 *         500: 
 *           description: Internal Server Error
 * 
 *   api/user/login:
 *     post:
 *       tags:
 *         - Users
 *       summary: Login a user
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *               example:
 *                 email: "luluberlu@hotmail.fr"
 *                 password: "password"
 * 
 *       responses:
 *         200:
 *           description: OK 
 *         500:
 *           description: Internal Server Error
 * 
 *   api/user/{id}:
 *     patch:
 *       tags:
 *        - Users
 *       summary: Modify a user by id
 *       parameters:
 *         - name: Authorization
 *           in: header
 *           description: Bearer token
 *           required: true
 *           type: string
 *           format: string       
 *         - name: id
 *           in: path
 *           description: id of the user
 *           required: true
 *           type: string
 *           format: string
 *       requestBody:
 *          description: Fields that can be modified
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  firstName:
 *                    type: string
 *                  lastName:
 *                    type: string
 *                  email:
 *                    type: string
 *                  password:
 *                    type: string               
 *
 *       responses:
 *         200:
 *           description: OK
 *         500:
 *           description: Internal Server Error
 * 
 *     delete:
 *       tags:
 *        - Users
 *       summary: Delete a user by id
 *       parameters:
 *         - name: Authorization
 *           in: header
 *           description: Bearer token
 *           required: true
 *           type: string
 *           format: string
 *         - name: id
 *           in: path
 *           description: id of the user
 *           required: true
 *           type: string
 *           format: string
 * 
 *       responses:
 *         200:
 *           description: OK
 *         500:
 *           description: Internal Server Error      
 *                                                              
 */

module.exports = router;