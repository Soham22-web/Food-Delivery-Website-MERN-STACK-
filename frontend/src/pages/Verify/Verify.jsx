import React, { useEffect, useContext } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const session_id = searchParams.get("session_id");

  const navigate = useNavigate();
  const { url, token } = useContext(StoreContext);

  const verifyPayment = async () => {
    try {
      await axios.post(url + "/api/order/verify", {
        orderId,
        session_id
      }, { headers: { token } });

      navigate("/myorders"); // always go to orders
    } catch (error) {
      console.log("Verify Error:", error);
      navigate("/myorders"); // even on error
    }
  };

  useEffect(() => {
    if (session_id && orderId) verifyPayment();
  }, [session_id, orderId]);

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
