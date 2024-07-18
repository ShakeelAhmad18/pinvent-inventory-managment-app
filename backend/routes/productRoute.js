const express =require('express');
const router=express.Router();
const {createProduct, getProducts, getSingleProduct, deleteProduct, updateProduct} = require('../controllers/productController');
const protecter = require('../middleWare/authMiddleware');
const { upload } = require('../utils/fileUpload');


router.post('/',protecter,upload.single("image"),createProduct) 
router.get('/',protecter,getProducts)
router.get('/:id',protecter,getSingleProduct)
router.delete('/:id',protecter,deleteProduct)
router.patch('/:id',protecter,upload.single("image"),updateProduct)


module.exports = router;