
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { checkToken, checkAdmin } = require('../middleware/authMiddleware');
const upload = require('../utils/s3Config');

router.get('/', productController.listProducts);
router.get('/check-name', productController.checkProductName);
router.get('/:id', productController.getProductById);
router.post('/', checkToken, checkAdmin, upload.single('image'), productController.createProduct);
router.put('/:id', checkToken, checkAdmin, upload.single('image'), productController.editProductById);
router.delete('/:id', checkToken, checkAdmin, productController.deleteProductById);

module.exports = router;
