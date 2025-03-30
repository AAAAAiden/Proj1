
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { checkToken, checkAdmin } = require('../middleware/authMiddleware');
const { uploadImage } = require('../utils/imageUpload');

router.get('/', productController.listProducts);
router.get('/:id', productController.getProductById);
router.get('/image/:id', productController.getProductImage);
router.post('/', checkToken, checkAdmin, uploadImage, productController.createProduct);
router.put('/:id', checkToken, checkAdmin, productController.editProductById);
router.delete('/:id', checkToken, checkAdmin, productController.deleteProductById);

module.exports = router;
