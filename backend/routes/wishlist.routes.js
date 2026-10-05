import express from 'express';
const router=express.Router();

import authMiddleware from "../middlewares/auth.middleware.js"

import{ addToWishlist,removeFromWishlist,getWishlist} from "../controllers/wishlist.controller.js"


router.post("/:productId",authMiddleware,addToWishlist)
router.delete("/:productId",authMiddleware,removeFromWishlist)
router.get("/",authMiddleware,getWishlist)


export default router;