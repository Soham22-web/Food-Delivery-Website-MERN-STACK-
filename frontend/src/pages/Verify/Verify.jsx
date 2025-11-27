import React, { useEffect, useContext } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { url, token } = useContext(StoreContext);

  useEffect(() => {
    const orderId = searchParams.get("orderId");

    const markPaymentTrue = async () => {
      try {
        // Call backend to mark payment true (demo hack)
        await axios.post(
          url + "/api/order/verify",
          { orderId },
          { headers: { token } }
        );
      } catch (error) {
        console.log("Verify Error:", error);
      } finally {
        // After backend update, go to MyOrders
        navigate("/myorders");
      }
    };

    if (orderId && token) {
      markPaymentTrue();
    } else {
      navigate("/myorders"); // fallback
    }
  }, [searchParams, token, url, navigate]);

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
