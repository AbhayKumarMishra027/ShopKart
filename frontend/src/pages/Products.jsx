import api from '../services/api'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Products.css"
import { useNavigate } from "react-router-dom";
import { addWishlist, removeWishlist, setWishlist } from '../redux/wishlistSlice';
import { useSelector, useDispatch } from 'react-redux';
import { addCart, setCart, removeCart } from '../redux/cartSlice';
import BackButton from "../components/BackButton";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    const [debouncedSearch, setDebouncedSearch] = useState("")

    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist)
    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate();

    useEffect(() => {
        const getCart = async () => {
            try {
                const response = await api.get("/cart");
                dispatch(setCart(response.data.cart));
            } catch (err) {
                console.log("Failed to load cart");
            }
        };

        getCart();
    }, [dispatch]);



    const handleWishlistToggle = async (product) => {
        const isWishlisted = wishlist.some(
            (item) => item._id === product._id
        );

        try {
            if (isWishlisted) {
                await api.delete(`/wishlist/${product._id}`);
                dispatch(removeWishlist(product._id));
            } else {
                await api.post(`/wishlist/${product._id}`);
                dispatch(addWishlist(product));
            }
        } catch (err) {
            console.log("Failed to update wishlist");
        }
    };
    const handleCartToggle = async (product) => {
        const isInCart = cart.some(
            (item) => item.product._id === product._id
        );

        try {
            if (isInCart) {
                await api.delete(`/cart/${product._id}`);
                dispatch(removeCart(product._id));
            } else {
                await api.post(`/cart/${product._id}`);

                dispatch(addCart({
                    product: product,
                    quantity: 1
                }));
            }
        } catch (err) {
            console.log("Failed to update cart");
        }
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 400)

        return () => {
            clearTimeout(timer);
        }
    }, [search])

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true)
                setError("")
                const response = await api.get(`/products?search=${debouncedSearch}&category=${category}`);
                setProducts(response.data.products)
            } catch (err) {
                setError("Failed to load Products")
            } finally {
                setLoading(false)
            }
        }
        getProducts();
    }, [debouncedSearch, category])

    useEffect(() => {
        const getWishlist = async () => {
            try {
                const response = await api.get("/wishlist");
                dispatch(setWishlist(response.data.products));
            } catch (err) {
                console.log("Failed to load wishlist");
            }
        };

        getWishlist();
    }, [dispatch]);

    return (
        <div className='products-page'>
            <BackButton />
            <div className='products-header'>
                <div>
                    <h1>Products</h1>
                    <p className='products-subtitle'>Explore products curated for everyday living</p>
                </div>
                <div className="products-header-actions">
                    <button onClick={() => navigate("/wishlist")}>
                        ❤️ Wishlist
                    </button>

                    <button onClick={() => navigate("/cart")}>
                        🛒 Cart
                    </button>
                    
                    <button onClick={() => navigate("/orders")}>
                        📦 Orders
                    </button>

                </div>
            </div>

            <div className='products-controls'>
                <input
                    type='text'
                    placeholder='Search Products...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value=''>All Categories</option>
                    <option value='Electronics'>Electronics</option>
                    <option value='Clothing'>Clothing</option>
                    <option value='Books'>Books</option>
                </select>
            </div>

            <div >

                {loading ? (
                    <h2>Loading Products...</h2>
                ) : error ? (
                    <h2>{error}</h2>
                ) : products.length === 0 ? (
                    <div>
                        <h2>No products found</h2>
                        <button
                            onClick={() => {
                                setSearch("");
                                setCategory("");
                            }}
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className='products-grid'>
                        {products.map((product) => (
                            <div className='product-card' key={product._id}>
                                <img src={product.image} alt={product.name} />
                                <h2>{product.name}</h2>
                                <p>{product.category}</p>
                                <p>Stock: {product.stock}</p>
                                <p>Price: {product.price}</p>

                                <div className="product-card-actions">
                                    <div className="product-primary-actions">

                                        <button onClick={() => handleWishlistToggle(product)}>
                                            {wishlist.some((item) => item._id === product._id)
                                                ? "❤️ Wishlisted"
                                                : "🤍 Add to wishlist"}
                                        </button>


                                        <button onClick={() => handleCartToggle(product)}>
                                            {cart.some((item) => item.product._id === product._id)
                                                ? "✅ In Cart"
                                                : "🛒 Add to Cart"}
                                        </button>

                                    </div>

                                    <Link
                                        className="view-details"
                                        to={`/products/${product._id}`}
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>

        </div>
    )
}

export default Products;