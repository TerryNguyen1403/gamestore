import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/game-store-logo-big.png'
import github_icon from '../Assets/github_icon.png'
import linkedin_icon from '../Assets/linkedin_icon.png'

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
          <a
            href="https://github.com/TerryNguyen1403/gamestore"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github_icon} alt="" />
          </a>
        </div>

        <div className="footer-icons-container">
            <a
            href="https://linkedin.com/in/nhtgiang2003"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedin_icon} alt="" />
          </a>
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
