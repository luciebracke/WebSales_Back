const express = require('express');
const router = express.Router();

const productController = require('../controller/product-controller');

router
.get('/', productController.get_all_products)
.post('/', productController.create_product)
.patch('/:id', productController.modify_product)
.delete('/:id', productController.delete_product);

module.exports = router;