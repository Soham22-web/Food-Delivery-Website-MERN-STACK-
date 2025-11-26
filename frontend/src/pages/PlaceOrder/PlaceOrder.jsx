import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    const orderItems = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: cartItems[item._id]
      }));

    const deliveryFee = getTotalCartAmount() === 0 ? 0 : 40; // INR

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + deliveryFee
    };

    try {
      const response = await axios.post(
        url + "/api/order/place",
        orderData,
        { headers: { token } }
      );

      if (response.data.success) {
        window.location.replace(response.data.session_url);
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>

        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />

        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>

        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="number" placeholder='Zip Code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>

        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="number" placeholder='Phone Number' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 40}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}</p>
            </div>
          </div>

          <button type="submit">PROCEED TO PAY</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
