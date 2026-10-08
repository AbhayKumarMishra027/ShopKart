import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            validate:{
                validator:Number.isInteger,
                message:"Quantity must be an Integer"
            }
        },
        image: {
            type: String
        }
    }],
    shippingAddress: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true,
            match: /^[1-9][0-9]{5}$/
        }
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["PENDING", "PLACED", "SHIPPED", "DELIVERED", "CANCELLED"],
        default: "PENDING",
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["PENDING", "PAID", "FAILED"],
        required: true,
        default: "PENDING"
    },
    razorpayOrderId: {
        type: String
    },
    razorpayPaymentId: {
        type: String
    }
},{
    timestamps:true
})

const Order=mongoose.model("Order",orderSchema)
export default Order;