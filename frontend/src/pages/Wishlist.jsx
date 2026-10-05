import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setWishlist, removeWishlist } from "../redux/wishlistSlice";
import api from "../services/api";
import "./Wishlist.css";
import BackButton from "../components/BackButton";

function Wishlist() {
    const wishlist = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();

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

    const handleRemove = async (productId) => {
        try {
            await api.delete(`/wishlist/${productId}`);
            dispatch(removeWishlist(productId));
        } catch (err) {
            console.log("Failed to remove from wishlist");
        }
    };

    return (
        <div className="wishlist-page">
            <BackButton />
            <div className="wishlist-header">
                <h1>My Wishlist ❤️</h1>
                <p>Your saved products</p>
            </div>

            {wishlist.length === 0 ? (
                <div className="wishlist-empty">
                    <h2>Your wishlist is empty</h2>
                    <p>Save products you love and find them here.</p>
                </div>
            ) : (
                <div className="wishlist-grid">
                    {wishlist.map((product) => (
                        <div className="wishlist-card" key={product._id}>
                            <img
                                src={product.image}
                                alt={product.name}
                            />

                            <div className="wishlist-card-content">
                                <h2>{product.name}</h2>
                                <p className="wishlist-category">
                                    {product.category}
                                </p>
                                <p className="wishlist-price">
                                    ₹{product.price}
                                </p>

                                <div className="wishlist-actions">
                                    <button
                                        onClick={() =>
                                            handleRemove(product._id)
                                        }
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Wishlist;