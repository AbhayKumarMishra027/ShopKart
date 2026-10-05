 import mongoose from 'mongoose';
import Product from "../models/product.model.js"

const addToWishlist=async(req,res)=>{
    const {productId}=req.params;

    if(!mongoose.Types.ObjectId.isValid(productId)){
        return res.status(400).json({
            message:"Invalid Product ID"
        })
    }

    const product=await Product.findById(productId);
    if(!product){
        return res.status(404).json({
            message:"Product not found"
        })
    }

    const alreadyExists=req.user.wishlist.some(id=>id.equals(productId))
    if(alreadyExists){
        return res.status(409).json({
            message:'Product already exists in wishList'
        })
    }

    req.user.wishlist.push(productId)
    await req.user.save();

    return res.status(200).json({
        message:"Product added to wishlist"
    })
};

const removeFromWishlist=async(req,res)=>{
    const {productId}=req.params;

    if(!mongoose.Types.ObjectId.isValid(productId)){
        return res.status(400).json({
            message:"Invalid Product ID"
        })
    }

    const alreadyExists=req.user.wishlist.some(id=>id.equals(productId))
    if(!alreadyExists){
        return res.status(404).json({
            message:"Product not in wishlist"
        })
    }

    req.user.wishlist.pull(productId)
    await req.user.save()

    return res.status(200).json({
        message:"Removed from wishlist"
    })
}

const getWishlist=async(req,res)=>{
    await req.user.populate({
        path:"wishlist",
        select:"name image price category stock"
    });
    return res.status(200).json({
        count:req.user.wishlist.length,
        products:req.user.wishlist
    })
}

export {addToWishlist,removeFromWishlist,getWishlist}