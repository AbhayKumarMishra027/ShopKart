import mongoose from 'mongoose';
import Product from '../models/product.model.js';
const addToCart=async(req,res)=>{
    const {productId}=req.params;

    if(!mongoose.Types.ObjectId.isValid(productId)){
        return res.status(400).json({
            message:'Invalid Product ID'
        })
    }
    const product=await Product.findById(productId);
    if(!product){
        return res.status(404).json({
            message:'Product not found'
        })
    }
    if(product.stock===0){
        return res.status(400).json({
            message:"Product is out of Stock"
        })
    }
    const cartItem=req.user.cart.find(item=>item.product.equals(productId ))
    if(cartItem===undefined){
        req.user.cart.push({product:productId, quantity:1})
    }else{
        if(cartItem.quantity +1 > product.stock){
            return res.status(400).json({
                message:"Cannot add more than available stock"
            })
        }
        cartItem.quantity+=1;
    }
    await req.user.save();
    return res.status(200).json({
        message:'Item Added to cart'
    })
}

const getCart=async(req,res)=>{
    await req.user.populate({
        path:'cart.product',
        select:"name image price category stock"
    })

    return res.status(200).json({
        cart:req.user.cart
    })
}

const updateCart=async(req,res)=>{
    const {quantity}=req.body;
    const {productId}=req.params;

    const product=await Product.findById(productId);
    if(!product){
        return res.status(404).json({
            message:"Product not found"
        })
    }
    if(!Number.isInteger(quantity)){
        return res.status(400).json({
            message:'Quantity must be an Integer'
        })
    }
    if(quantity<1){
        return res.status(400).json({
            message:'Quantity must be atleast 1'
        })
    }
    if(quantity >product.stock){
        return res.status(400).json({
            message:"Quantity exceeds available stock"
        })
    }
    const cartItem=req.user.cart.find(item=>item.product.equals(productId))
    if(cartItem===undefined){
        return res.status(404).json({
            message:'Product not in cart'
        })
    }
    cartItem.quantity=quantity;
    await req.user.save();
    return res.status(200).json({
        message:"Cart uppdated successfully"
    })
}

const removeFromCart=async(req,res)=>{
    const{productId}=req.params;
    if(!mongoose.Types.ObjectId.isValid(productId)){
        return res.status(400).json({
            message:"Invalid Product ID"
        })
    }
    const cartItem=req.user.cart.find(item=>item.product.equals(productId))
    if(cartItem===undefined){
        return res.status(404).json({
            message:"Product not in the cart"
        })
    }
    req.user.cart.pull({product:productId})
    await req.user.save();

    return res.status(200).json({
        message:"removed from the cart"
    })
}

export {addToCart,getCart,updateCart,removeFromCart}