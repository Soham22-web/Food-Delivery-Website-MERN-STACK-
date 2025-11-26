import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo}/>
                <p>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon}/>
                                        <img src={assets.twitter_icon}/>
                                            <img src={assets.linkedin_icon}/>


                </div>
            </div>
                        <div className="footer-content-center">
                            <h2>COMPANY</h2>
                            <ul>
                                <li>Home</li>
                                <li>Menu</li>
                                <li>Mobile App</li>
                                <li>Concatct Us</li>
                            </ul>
                        </div>

            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91-777-601-5046</li>
                    <li>Contact@tomato.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className="footer-copyright">
            Copyright 2025 © Tomato.com - Sohamm22-web
        </p>
    </div>
  )
}

export default Footer