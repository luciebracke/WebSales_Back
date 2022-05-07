const express = require('express');
const router = express.Router();

const productController = require('../controllers/product-controller');

const authentification = require('../middleware/authenticate-middleware');
const isUserAdmin = require('../middleware/admin-middleware');

router
.get('/', productController.get_all_products)
.get('/:id', productController.get_products_per_user)
.get('/products-user-bid-on/:id', productController.get_products_user_bid_on)
.post('/', authentification, productController.create_product)
.patch('/:id', authentification, productController.modify_product)
.patch('/bids/:id', authentification, productController.add_bidders_to_product)
.delete('/:id', authentification, productController.delete_product);

/** 
 * @swagger
 * 
 * paths:
 *   /api/products:
 *     get:
 *       summary: Gets all products
 *       tags:
 *         - Products
 *       parameters:
 *         - name: Authorization
 *           in: header
 *           description: Bearer token
 *           required: true
 *           type: string
 *           format: string
 *       responses:
 *         200:
 *           description: OK
 *         500:
 *           description: Internal server error
 * 
 *     post:
 *       tags:
 *         - Products
 *       summary: Creates a new product
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 base_price:
 *                   type: number
 *                 beginning_of_the_auction:
 *                   type: date
 *                 end_of_the_auction:
 *                   type: date      
 *                 image:
 *                   type: string
 *             example:
 *               title: "My product"
 *               description: "My product description"
 *               base_price: 100
 *               beginning_of_the_auction: "2020-01-01"
 *               end_of_the_auction: "2020-01-02"
 *               image: "j4fRtRXhpZgAASUkqAAgAAAAMAAABBAABAAAAwA8AAAEBBAABAAAA0AsAAA8BAgAIAAAAngAAABABAgAJAAAApgAAABIBAwABAAAABgAAABoBBQABAAAA0gAAABsBBQABAAAA2gAAACgBAwABAAAAAgAAADEBAgAOAAAAsAAAADIBAgAUAAAAvgAAABMCAwABAAAAAQAAAGmHBAABAAAA4gA"
 * 
 *       responses:
 *         201:
 *           description: Created
 *         500:
 *           description: Internal Server Error
 * 
 *   /api/products/:id:
 *     get:
 *       tags:
 *         - Products
 *       summary: Gets the offers that were posted by the user
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
 *     patch:
 *       tags:
 *        - Products
 *       summary: Modifies a product
 *       parameters:
 *         - name: Authorization
 *           in: header
 *           description: Bearer token
 *           required: true
 *           type: string
 *           format: string
 *         - name: id
 *           in: path
 *           description: id of the product
 *           required: true
 *           type: string
 *           format: string
 *       requestBody:
 *         description: Fields that can be modified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 base_price:
 *                   type: number
 *                 beginning_of_the_auction:
 *                   type: date
 *                 end_of_the_auction:
 *                   type: date
 *                 image:
 *                   type: string
 *
 *       responses:
 *         200:
 *           description: OK
 *         500:
 *           description: Internal Server Error
 * 
 *     delete:                      
 *       tags:
 *         - Products
 *       summary: Deletes a product
 *       parameters:
 *         - name: Authorization
 *           in: header
 *           description: Bearer token
 *           required: true
 *           type: string
 *           format: string
 *         - name: id
 *           in: path
 *           description: id of the product
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
 *   /api/products-user-bid-on/:id:
 *     get:
 *       tags:
 *         - Products
 *       summary: Gets all products a user bid on
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
 *   /api/products/bids/:id:
 *     patch:
 *       tags:
 *         - Products
 *       summary: Adds a bid to a product
 *       parameters:
 *        - name: Authorization
 *          in: header
 *          description: Bearer token
 *          required: true
 *          type: string
 *          format: string
 *        - name: id
 *          in: path
 *          description: id of the product
 *          required: true
 *          type: string
 *          format: string
 *       requestBody:
 *         description: adds a bid to an offer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bidder_bid_amount:
 *                   type: number
 *             example:
 *               bidder_bid_amount: 100  
 *                                                                                                                                  
 *       responses:
 *        200:
 *          description: OK
 *        500:
 *          description: Internal server error        
*/

module.exports = router;