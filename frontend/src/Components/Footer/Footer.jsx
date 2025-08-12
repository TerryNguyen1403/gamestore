import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/game-store-logo-big.png'
import ins_icon from '../Assets/instagram_icon.png'
import linkedin_icon from '../Assets/linkedin_icon.png'
import facebook_icon from '../Assets/facebook_icon.png'

const Footer = () => {
  return (
    <div className='footer'>

      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>GAMESTORE</p>
      </div>

      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      <div className="footer-social-icon">
        <div className="footer-icons-container">
            <img src={ins_icon} alt="" />
        </div>

        <div className="footer-icons-container">
            <img src={facebook_icon} alt="" />
        </div>

        <div className="footer-icons-container">
            <img src={linkedin_icon} alt="" />
        </div>
      </div>

      <div className="footer-copyright">
        <hr />
        <p>Copyright @2023 - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
