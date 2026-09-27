import express from 'express';
const app=express();

import cloudinary from "./config/cloudinary.js";

import "dotenv/config"
import connectDB from './config/db.js';

const port=3000;

import customerRoutes from "./routes/customer.routes.js"
import cookieParser from 'cookie-parser';

import productRoutes from './routes/product.routes.js'

import uploadRoutes from "./routes/upload.routes.js"

app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

app.use("/customers",customerRoutes)
app.use('/products',productRoutes)

app.use('/upload',uploadRoutes)

app.get("/",(req,res)=>{
    res.send("hello")
})

connectDB();

app.listen(port,()=>{
    console.log('server Started')
})