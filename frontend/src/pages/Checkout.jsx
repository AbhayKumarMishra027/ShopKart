import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Checkout.css"
import BackButton from "../components/BackButton";

function Checkout() {

    const navigate = useNavigate();

    const [shippingAddress, setShippingAddress] = useState({
        address: "",
        city: "",
        state: "",
        pincode: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value
        });
    };

    const handleCheckout = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await api.post(
                "/orders/create-payment-order",
                {
                    shippingAddress
                }
            );

            const data = response.data;

            const options = {
                key: data.keyId,
                amount: data.amount,
                currency: data.currency,

                name: "ShopKart",
                description: "ShopKart Order",

                order_id: data.razorpayOrderId,

                handler: async function (paymentResponse) {

                    try {

                        await api.post(
                            "/orders/verify-payment",
                            {
                                orderId: data.orderId,
                                razorpayPaymentId:
                                    paymentResponse.razorpay_payment_id,
                                razorpaySignature:
                                    paymentResponse.razorpay_signature
                            }
                        );

                        alert("Payment successful! Order placed.");

                        navigate("/orders");

                    } catch (error) {

                        console.error(
                            "Payment verification failed:",
                            error
                        );

                        alert(
                            error.response?.data?.message ||
                            "Payment verification failed"
                        );
                    }
                },

                prefill: {
                    name: "",
                    email: ""
                },

                theme: {
                    color: "#111827"
                }
            };

            const razorpay = new window.Razorpay(options);

            razorpay.open();

        } catch (error) {

            console.error("Checkout failed:", error);

            alert(
                error.response?.data?.message ||
                "Failed to start checkout"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-page">
            <BackButton/>
            <div className="checkout-header">
                <p className="checkout-eyebrow">SECURE CHECKOUT</p>
                <h1>Complete Your Order</h1>
                <p>Enter your delivery details and proceed to secure payment.</p>
            </div>

            <div className="checkout-layout">

                {/* Shipping Address */}

                <div className="checkout-card">

                    <div className="checkout-card-header">
                        <div className="checkout-step">01</div>

                        <div>
                            <h2>Shipping Address</h2>
                            <p>Where should we deliver your order?</p>
                        </div>
                    </div>

                    <form onSubmit={handleCheckout}>

                        <div className="checkout-field">
                            <label>Address</label>

                            <input
                                type="text"
                                name="address"
                                placeholder="Flat, house no., street, area"
                                value={shippingAddress.address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="checkout-row">

                            <div className="checkout-field">
                                <label>City</label>

                                <input
                                    type="text"
                                    name="city"
                                    placeholder="Bengaluru"
                                    value={shippingAddress.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="checkout-field">
                                <label>State</label>

                                <input
                                    type="text"
                                    name="state"
                                    placeholder="Karnataka"
                                    value={shippingAddress.state}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>

                        <div className="checkout-field">
                            <label>Pincode</label>

                            <input
                                type="text"
                                name="pincode"
                                placeholder="560100"
                                value={shippingAddress.pincode}
                                onChange={handleChange}
                                maxLength="6"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="checkout-pay-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Processing..."
                                : "Proceed to Payment →"}
                        </button>

                    </form>

                </div>


                {/* Order Summary */}

                <div className="checkout-summary">

                    <div className="checkout-card-header">
                        <div className="checkout-step">02</div>

                        <div>
                            <h2>Order Summary</h2>
                            <p>Review before payment.</p>
                        </div>
                    </div>

                    <div className="checkout-summary-item">
                        <span>Order total</span>
                        <strong>Calculated securely at checkout</strong>
                    </div>

                    <div className="checkout-divider"></div>

                    <div className="checkout-total">
                        <span>Total</span>
                        <strong>₹ Secure Payment</strong>
                    </div>

                    <div className="checkout-security">
                        <span>🔒</span>

                        <div>
                            <strong>Secure Payment</strong>
                            <p>
                                Your payment is securely processed through
                                Razorpay.
                            </p>
                        </div>
                    </div>

                    <div className="checkout-trust">
                        <span>✓</span>
                        <p>Stock verified before order creation</p>
                    </div>

                    <div className="checkout-trust">
                        <span>✓</span>
                        <p>Payment verified securely</p>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Checkout;