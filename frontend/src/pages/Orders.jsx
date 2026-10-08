import { useEffect, useState } from "react";
import api from "../services/api";
import "./Orders.css";
import BackButton from "../components/BackButton";
import "./Orders.css"
function Orders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const response = await api.get("/orders");

                setOrders(response.data.orders);

            } catch (error) {

                console.error("Failed to fetch orders:", error);

            } finally {

                setLoading(false);

            }
        };

        fetchOrders();

    }, []);

    if (loading) {
        return (
            <div className="orders-page">
                <BackButton />
                <div className="orders-state">
                    <h2>Loading your orders...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="orders-page">

            <BackButton />

            <div className="orders-header">

                <p className="orders-eyebrow">
                    ORDER HISTORY
                </p>

                <h1>My Orders</h1>

                <p>
                    Track and review your previous purchases.
                </p>

            </div>


            {orders.length === 0 ? (

                <div className="orders-empty">

                    <h2>No orders yet</h2>

                    <p>
                        Your completed orders will appear here.
                    </p>

                </div>

            ) : (

                <div className="orders-list">

                    {orders.map((order) => (

                        <div
                            className="order-card"
                            key={order._id}
                        >

                            <div className="order-header">

                                <div>

                                    <p className="order-label">
                                        ORDER ID
                                    </p>

                                    <h2>
                                        #{order._id}
                                    </h2>

                                </div>

                                <div className="order-status">
                                    {order.status}
                                </div>

                            </div>


                            <div className="order-items">

                                {order.items.map((item) => (

                                    <div
                                        className="order-item"
                                        key={item._id}
                                    >

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                        />

                                        <div className="order-item-info">

                                            <h3>
                                                {item.name}
                                            </h3>

                                            <p>
                                                Quantity: {item.quantity}
                                            </p>

                                        </div>

                                        <strong>
                                            ₹{item.price * item.quantity}
                                        </strong>

                                    </div>

                                ))}

                            </div>


                            <div className="order-footer">

                                <div>

                                    <span>Payment</span>

                                    <strong>
                                        {order.paymentStatus}
                                    </strong>

                                </div>

                                <div>

                                    <span>Total</span>

                                    <strong>
                                        ₹{order.totalAmount}
                                    </strong>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default Orders;