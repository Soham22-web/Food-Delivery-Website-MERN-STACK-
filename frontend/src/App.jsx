import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes , Navigate } from 'react-router-dom';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import Myorders from './pages/Myorders/Myorders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [showlogin, setShowLogin] = useState(false);

  return (
    <>
      {showlogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<Myorders />} />
          <Route path="/admin" element={<Navigate to="/admin/list" />} />

        </Routes>
      </div>

      <Footer />

      {/* Global ToastContainer */}
      <ToastContainer
        position="top-right"
        autoClose={3000}       // disappears after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"          // clean white design, no shadow
      />
    </>
  );
};

export default App;
