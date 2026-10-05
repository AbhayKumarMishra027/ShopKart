import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCart, updateCart, removeCart } from "../redux/cartSlice";
import api from "../services/api";
import "./Cart.css";
import BackButton from "../components/BackButton";

function Cart() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

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

    const handleQuantityChange = async (productId, quantity) => {
        try {
            await api.patch(`/cart/${productId}`, {
                quantity: quantity
            });

            dispatch(updateCart({
                productId,
                quantity
            }));
        } catch (err) {
            console.log("Failed to update quantity");
        }
    };

    const handleRemove = async (productId) => {
        try {
            await api.delete(`/cart/${productId}`);
            dispatch(removeCart(productId));
        } catch (err) {
            console.log("Failed to remove from cart");
        }
    };

    const subtotal = cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    const delivery = subtotal > 0 ? 50 : 0;
    const total = subtotal + delivery;

    return (
        <div className="cart-page">
            <BackButton />
            <div className="cart-header">
                <div>
                    <p className="cart-eyebrow">SHOPPING CART</p>
                    <h1>Your Cart</h1>
                    <p>Review your items before checkout.</p>
                </div>
            </div>

            {cart.length === 0 ? (
                <div className="cart-empty">
                    <h2>Your cart is empty</h2>
                    <p>Add some products to get started.</p>
                </div>
            ) : (
                <div className="cart-layout">

                    {/* Cart Items */}

                    <div className="cart-items">

                        <div className="cart-items-header">
                            <span>PRODUCT</span>
                            <span>PRICE</span>
                            <span>QUANTITY</span>
                            <span>TOTAL</span>
                        </div>

                        {cart.map((item) => (
                            <div
                                className="cart-item"
                                key={item.product._id}
                            >

                                <div className="cart-product">
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                    />

                                    <div>
                                        <h2>{item.product.name}</h2>
                                        <p>{item.product.category}</p>

                                        <button
                                            onClick={() =>
                                                handleRemove(
                                                    item.product._id
                                                )
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                <div className="cart-price">
                                    ₹{item.product.price}
                                </div>

                                <div className="cart-quantity">
                                    <button
                                        onClick={() =>
                                            handleQuantityChange(
                                                item.product._id,
                                                item.quantity - 1
                                            )
                                        }
                                        disabled={item.quantity === 1}
                                    >
                                        −
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                        onClick={() =>
                                            handleQuantityChange(
                                                item.product._id,
                                                item.quantity + 1
                                            )
                                        }
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="cart-item-total">
                                    ₹
                                    {item.product.price *
                                        item.quantity}
                                </div>

                            </div>
                        ))}
                    </div>


                    {/* Billing Summary */}

                    <div className="cart-summary">

                        <h2>Order Summary</h2>

                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>₹{subtotal}</span>
                        </div>

                        <div className="summary-row">
                            <span>Delivery</span>
                            <span>₹{delivery}</span>
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-total">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>

                        <button className="checkout-button">
                            Proceed to Checkout
                        </button>

                        <p className="secure-text">
                            🔒 Secure checkout
                        </p>

                    </div>

                </div>
            )}

        </div>
    );
}

export default Cart;