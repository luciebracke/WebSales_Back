const express = require('express');
const router = express.Router();

const productController = require('../controller/product-controller');

const authentification = require('../middleware/authenticate-middleware');
const isUserAdmin = require('../middleware/admin-middleware');

router
.get('/', productController.get_all_products)
.get('/:id', productController.get_products_per_user)
.get('/products-user-bid-on/:id', productController.get_products_user_bid_on)
.post('/', authentification, productController.create_product)
.patch('/:id', authentification, productController.modify_product)
.patch('/bids/:id', authentification, productController.add_bidders_to_product)
.delete('/:id', [authentification, isUserAdmin], productController.delete_product);

module.exports = router;