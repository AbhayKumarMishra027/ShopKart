import express from 'express'
const router=express.Router();

import { createProduct,getProducts,getProductById } from '../controllers/product.controller.js';
import upload from '../middlewares/upload.middleware.js';

router.post('/',upload.single("image"),createProduct)
router.get('/',getProducts)
router.get('/:id',getProductById)
export default router;