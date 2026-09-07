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
    }
    
},{
    timestamps:true
})

const Customer=mongoose.model("Customer",customerSchema)

export default Customer;
