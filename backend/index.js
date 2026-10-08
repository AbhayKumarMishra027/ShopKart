import express from 'express';
const app = express();

import cloudinary from "./config/cloudinary.js";

import "dotenv/config"
import connectDB from './config/db.js';

const port = process.env.PORT || 3000;

import customerRoutes from "./routes/customer.routes.js"
import cookieParser from 'cookie-parser';

import productRoutes from './routes/product.routes.js'

import uploadRoutes from "./routes/upload.routes.js"

import wishlistRoutes from "./routes/wishlist.routes.js"

import cartRoutes from './routes/cart.routes.js'

import orderRoutes from "./routes/order.routes.js";

app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
    const allowedOrigin =
        process.env.NODE_ENV === "production"
            ? "https://shop-kart-two-beta.vercel.app"
            : "http://localhost:5173";

    res.header("Access-Control-Allow-Origin", allowedOrigin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

app.use("/customers", customerRoutes)
app.use('/products', productRoutes)

app.use('/upload', uploadRoutes)
app.use('/wishlist', wishlistRoutes)
app.use('/cart', cartRoutes)
app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
    res.send("hello")
})

connectDB();

app.listen(port, () => {
    console.log('server Started')
})