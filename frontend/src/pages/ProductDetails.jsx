import { useParams } from "react-router-dom"
import api from "../services/api";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import "./ProductDetails.css"

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null)

    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data.product)
            } catch (err) {
                setError("Failed to load product")
            }
        }
        getProduct()
    }, [id])

    if (!product && !error) {
        return <h2>Loading product...</h2>
    }
    if (error) {
        return (
            <div>
                <h2>{error}</h2>
                <button onClick={() => navigate("/products")}>Go Back</button>
            </div>
        )
    }
    return (
        <div className="product-details-page">
            <div className="product-details-card">
                <img className="product-details-image" src={product.image} alt={product.name} />

                <div className="product-details-info">
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <p className="product-price">Price: ₹{product.price}</p>
                    <p>Category: {product.category}</p>
                    <p>Stock: {product.stock}</p>
                </div>

                <div className="product-details-actions">
                    <button className="add-cart-btn">Add to Cart</button>
                    <button className="back-btn" onClick={() => navigate("/products")}>Go back</button>
                </div>
            </div>
        </div>
    )
}
export default ProductDetails