const express = require('express');
const router = express.Router();

const productController = require('../controller/product-controller');

const authentification = require('../middleware/authenticate-middleware');
const multer = require('../middleware/multer-middleware');

router
.get('/', authentification, productController.get_all_products)
.get('/:id', authentification, productController.get_products_per_user)
.post('/', authentification, multer,  productController.create_product)
.patch('/:id', authentification, productController.modify_product)
.patch('/bids/:id', authentification, productController.add_bidders_to_product)
.delete('/:id', authentification, productController.delete_product);

module.exports = router;