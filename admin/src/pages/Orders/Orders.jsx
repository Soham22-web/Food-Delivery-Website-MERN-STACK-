import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/order/list");
      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;

    try {
      // Using POST to match your backend
      const { data } = await axios.post(
        "http://localhost:4000/api/order/update",
        { orderId, status: newStatus }
      );

      if (data.success) {
        // Update local state so UI updates instantly
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order-add">
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />

            <div>
              <p className="order-item-food">
                {order.items?.map((item, idx) => {
                  const last = order.items.length - 1;
                  return (
                    item.name +
                    " X " +
                    item.quantity +
                    (idx === last ? "" : ", ")
                  );
                })}
              </p>

              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>

              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>

              <p className="order-item-phone">{order.address.phone}</p>
            </div>

            {/* ITEMS COUNT */}
            <p className="order-items-count">
              Items:{" "}
              <span className="order-items-value">{order.items.length}</span>
            </p>

            <div className="order-amount-status">
              {/* Total Amount */}
              <p className="order-amount">
                Total Amount:{" "}
                <span className="order-amount-value">
                  ₹{order.amount}
                </span>
              </p>

              {/* Status text */}
              <p className="order-status-label">
                Order Status:{" "}
                <span className="order-status-value">{order.status}</span>
              </p>

              <select
                className="track-order-btn"
                defaultValue="track"
                onChange={(event) => statusHandler(event, order._id)}
              >
                <option value="track" disabled>
                  Track Order
                </option>
                <option value="Food Processing..">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
