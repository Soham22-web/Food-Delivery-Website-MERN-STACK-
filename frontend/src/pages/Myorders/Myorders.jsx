import React, { useState, useContext, useEffect } from 'react';
import './Myorders.css';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';

const Myorders = () => {
    const { url, token } = useContext(StoreContext);
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(
                url + "/api/order/userorders",
                {},
                { headers: { token } }
            );
            setOrders(response.data.data || []);
        } catch (error) {
            console.log("FETCH ERROR:", error);
        }
    };

    useEffect(() => {
        if (token) fetchOrders();
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {orders.length === 0 && <p>No orders found.</p>}

                {orders.map((order, index) => (
                    <div key={index} className="my-orders-order">

                        <img src={assets.parcel_icon} alt="parcel" />

                        {/* Food items */}
                        <p className="order-items">
                            {order.items.map((item, i) => (
                                <span key={i} className="order-item-name">
                                    {item.name} x {item.quantity}
                                    {i !== order.items.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </p>

                        {/* Order Amount */}
                        <p>
                            Order Amount: <span className="value">₹{order.amount}</span>
                        </p>

                        {/* Total items */}
                        <p>
                            Items: <span className="value">{order.items.length}</span>
                        </p>

                        {/* Status stuck to the right */}
                        <p className="order-status">
                            Status: <span className="value">{order.status || "No Status"}</span>
                        </p>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Myorders;
