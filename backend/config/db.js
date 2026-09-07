import mongoose from'mongoose';

// mongoose.connect(process.env.MONGO_URI)
// .then(()=>{
//     console.log("DATABASE CONNECTED")
// })
// .catch((err)=>{
//     console.log("DATABASE CONNECTION FAILED")
// })

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected")
    }catch(err){
        console.log("Database Connection Failed")
        console.log(err.message)
    }
}

export default connectDB;