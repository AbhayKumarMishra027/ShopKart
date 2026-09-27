import api from '../services/api'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Products.css"

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    const [debouncedSearch, setDebouncedSearch] = useState("")

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


    return (
        <div className='products-page'>
            <div className='products-header'>
                <h1>Products</h1>
                <p className='products-subtitle'>Explore products curated for everyday living</p>
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
                                <Link to={`/products/${product._id}`}>View Details</Link>
                            </div>
                        ))}
                    </div>
                )}

            </div>

        </div>
    )
}

export default Products;