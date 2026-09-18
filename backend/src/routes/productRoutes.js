const express = require('express');
const router = express.Router();

// BAGIAN INI YANG DIUBAH: Pastikan folder dan nama filenya sudah sesuai (huruf p kecil)
const { createProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const { validateProduct } = require('../middlewares/validation');

router.post('/', createProduct);
router.get('/', getAllProducts);
router.put('/:id', validateProduct, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
