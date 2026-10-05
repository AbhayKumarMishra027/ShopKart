import mongoose from 'mongoose';

const customerSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    wishlist:{
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }],
        default:[]
    },

    cart:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        },
        quantity:{
            type:Number,
            min:1
        }
    }]
},{
    timestamps:true
})

const Customer=mongoose.model("Customer",customerSchema)

export default Customer;
