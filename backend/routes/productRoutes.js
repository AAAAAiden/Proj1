
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { checkToken, checkAdmin } = require('../middleware/authMiddleware');

router.get('/', productController.listProducts);
router.get('/:id', productController.getProductById);
router.post('/', checkToken, checkAdmin, productController.createProduct);
router.put('/:id', checkToken, checkAdmin, productController.editProductById);
router.delete('/:id', checkToken, checkAdmin, productController.deleteProductById);

module.exports = router;
