import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
const router=express.Router();

import {addToCart,getCart,updateCart,removeFromCart} from "../controllers/cart.controller.js"

router.post('/:productId',authMiddleware,addToCart);
router.get('/',authMiddleware,getCart)
router.patch("/:productId",authMiddleware,updateCart)
router.delete('/:productId',authMiddleware,removeFromCart)

export default router;