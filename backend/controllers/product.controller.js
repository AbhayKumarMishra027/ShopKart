import Product from "../models/product.model.js";
import cloudinary from "../config/cloudinary.js";

const createProduct = async (req, res) => {
    const { name, description, price, category, stock } = req.body;

    if (!name || !description || !price || !category || !req.file|| stock === undefined) {
        return res.status(400).json({
            message: 'All fields are required'
        })
    }
    const productPrice=Number(price);
    const productStock=Number(stock);

    if (Number.isNaN(productPrice) || Number.isNaN(productStock)) {
        return res.status(400).json({
            message: 'Invalid Input'
        })
    }

    if (productPrice <= 0 || productStock < 0) {
        return res.status(400).json({
            message: 'Invalid Data'
        })
    }

    try {
        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
        );
        const imageUrl=result.secure_url;
        const product = await Product.create({ name, description, price:productPrice, category, image:imageUrl, stock:productStock })
        return res.status(201).json({
            message: 'Product Successfully Added',
            data: product
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const getProducts = async (req, res) => {
    try {
        const { category, search } = req.query;

        const filter = {};
        if (category) {
            filter.category = category;
        }
        if (search) {
            filter.name = {
                $regex: search,
                $options: 'i'
            }
        }
        const products = await Product.find(filter);

        return res.status(200).json({
            success: true,
            count: products.length,
            products: products
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        return res.status(200).json({
            success: true,
            product
        })
    } catch (err) {
        return res.status(400).json({
            message: "Invalid Product ID"
        })
    }
}

export { createProduct, getProducts, getProductById }