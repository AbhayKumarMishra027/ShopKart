import mongoose from "mongoose";
import crypto from "crypto";

import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import razorpay from "../config/razorpay.js";


const createPaymentOrder = async (req, res) => {
    try {
        const cart = req.user.cart;

        if (!cart || cart.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        const orderItems = [];
        let totalAmount = 0;

        for (const cartItem of cart) {
            const { product, quantity } = cartItem;

            if (!mongoose.Types.ObjectId.isValid(product)) {
                return res.status(400).json({
                    message: "Invalid Product ID"
                });
            }

            const productData = await Product.findById(product);

            if (!productData) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            if (quantity < 1 || !Number.isInteger(quantity)) {
                return res.status(400).json({
                    message: "Invalid quantity"
                });
            }

            if (quantity > productData.stock) {
                return res.status(400).json({
                    message: `Insufficient stock for ${productData.name}`
                });
            }

            const itemTotal = productData.price * quantity;
            totalAmount += itemTotal;

            orderItems.push({
                product: productData._id,
                name: productData.name,
                price: productData.price,
                quantity: quantity,
                image: productData.image
            });
        }
        const { shippingAddress } = req.body;

        if (!shippingAddress) {
            return res.status(400).json({
                message: "Shipping address is required"
            });
        }

        const {
            address,
            city,
            state,
            pincode
        } = shippingAddress;

        if (!address || !city || !state || !pincode) {
            return res.status(400).json({
                message: "Complete shipping address is required"
            });
        }

        if (!/^[1-9][0-9]{5}$/.test(String(pincode))) {
            return res.status(400).json({
                message: "Invalid pincode"
            });
        }

        const order = await Order.create({
            customer: req.user._id,
            items: orderItems,
            shippingAddress: {
                address,
                city,
                state,
                pincode: String(pincode)
            },
            totalAmount,
            status: "PENDING",
            paymentStatus: "PENDING"
        });

        const razorpayOrder = await razorpay.orders.create({
            amount: Math.round(totalAmount * 100),
            currency: "INR",
            receipt: order._id.toString()
        });

        order.razorpayOrderId = razorpayOrder.id;
        await order.save();

        return res.status(201).json({
            message: "Payment order created successfully",
            orderId: order._id,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            keyId: process.env.RAZORPAY_KEY_ID
        });

    } catch (error) {
        console.error("Create payment order error:", error);

        return res.status(500).json({
            message: "Failed to create payment order"
        });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const {
            orderId,
            razorpayPaymentId,
            razorpaySignature
        } = req.body;

        if (!orderId || !razorpayPaymentId || !razorpaySignature) {
            return res.status(400).json({
                message: "Payment verification details are required"
            });
        }

        const order = await Order.findOne({
            _id: orderId,
            customer: req.user._id
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${order.razorpayOrderId}|${razorpayPaymentId}`)
            .digest("hex");

        if (generatedSignature !== razorpaySignature) {
            return res.status(400).json({
                message: "Invalid payment signature"
            });
        }
        order.paymentStatus = "PAID";
        order.status = "PLACED";
        order.razorpayPaymentId = razorpayPaymentId;


        req.user.cart = [];

        await req.user.save();
        await order.save();

        return res.status(200).json({
            message: "Payment verified and order placed successfully",
            orderId: order._id
        });

    } catch (error) {
        console.error("Verify payment error:", error);

        return res.status(500).json({
            message: "Payment verification failed"
        });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            customer: req.user._id
        }).sort({
            createdAt: -1
        });

        return res.status(200).json({
            orders
        });

    } catch (error) {
        console.error("Get orders error:", error);

        return res.status(500).json({
            message: "Failed to fetch orders"
        });
    }
};


const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid Order ID"
            });
        }

        const order = await Order.findOne({
            _id: id,
            customer: req.user._id
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        return res.status(200).json({
            order
        });

    } catch (error) {
        console.error("Get order error:", error);

        return res.status(500).json({
            message: "Failed to fetch order"
        });
    }
};


export {
    createPaymentOrder,
    verifyPayment,
    getOrders,
    getOrderById
};