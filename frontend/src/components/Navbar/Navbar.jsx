import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  // ⭐ Smooth scroll handler
  const smoothScrollTo = (sectionId) => {
    navigate('/'); // go to home first
    setTimeout(() => {
      document.querySelector(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 200); // delay so the page loads first
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="Logo" className="logo" /></Link>

      <ul className='navbar-menu'>
        <li>
          <Link
            to='/'
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </Link>
        </li>

        {/* ⭐ Now smooth scrolling! */}
        <li>
          <p
            onClick={() => {
              setMenu("menu");
              smoothScrollTo("#explore-menu");
            }}
            className={menu === "menu" ? "active" : ""}
            style={{ cursor: "pointer" }}
          >
            Menu
          </p>
        </li>

        <li>
          <p
            onClick={() => {
              setMenu("mobile app");
              smoothScrollTo("#app-download");
            }}
            className={menu === "mobile app" ? "active" : ""}
            style={{ cursor: "pointer" }}
          >
            Mobile App
          </p>
        </li>

        <li>
          <p
            onClick={() => {
              setMenu("contact us");
              smoothScrollTo("#footer");
            }}
            className={menu === "contact us" ? "active" : ""}
            style={{ cursor: "pointer" }}
          >
            Contact Us
          </p>
        </li>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" />

        <div className="navbar-search-icon">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="Basket" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className='navbar-profile'>
            <img
              src={assets.profile_icon}
              alt="profile"
              className="profile-icon"
            />

            <ul className="navbar-profile-dropdown">
              <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={handleLogout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
