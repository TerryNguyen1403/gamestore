// import React from 'react'
import './Navbar.css';

import logo from '../Assets/game-store-logo.png';
import cart_icon from '../Assets/cart_icon.png'
import dropdown_icon from '../Assets/nav_dropdown.png'

import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {
  let navigate = useNavigate();

  const [menu, setMenu] = useState('shop');
  const { getTotalItems, updateAuthStatus, resetCart } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  const handleLogout = () => {
    resetCart();
    localStorage.removeItem('auth-token');
    updateAuthStatus(false);
    alert('Đăng xuất thành công');
    navigate('/');
  }

  return (
    <div className='navbar'>

      <div className='nav-logo'>
        <img src={logo} alt='logo' />
        <p>GAMESTORE</p>
      </div>

      <img
        className='nav-dropdown'
        src={dropdown_icon} alt=""
        onClick={dropdown_toggle}
      />

      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => {setMenu('shop')}}>
            <Link style={{ textDecoration: 'none' }} to='/'>
                Trang chủ
            </Link>
            {menu==='shop' ? <hr/> : <></>}
        </li>

        <li onClick={() => {setMenu('Windows')}}>
            <Link style={{ textDecoration: 'none' }} to='/Windows'>
                Windows
            </Link>
            {menu==='Windows' ? <hr/> : <></>}
        </li>

        <li onClick={() => {setMenu('Playstation')}}>
            <Link style={{ textDecoration: 'none' }} to='/Playstation'>
                Playstation 5
            </Link>
            {menu==='Playstation' ? <hr/> : <></>}
        </li>

        <li onClick={() => {setMenu('Nintendo')}}>
            <Link style={{ textDecoration: 'none' }} to='/Nintendo'>
                Nintendo Swtich
            </Link>
            {menu==='Nintendo' ? <hr/> : <></>}
        </li>
      </ul>

      <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ? (
          <button
            onClick={() => {
              handleLogout()
            }}
          >
            Đăng xuất
          </button>
        ) : (
          <Link to='/login'>
            <button>Đăng nhập</button>
          </Link>
        )}

        <Link to='/cart'>
            <img src={cart_icon} alt='cart_icon' />
        </Link>
        <div className="nav-cart-count">
          {getTotalItems()}
        </div>
      </div>

    </div>
  )
}

export default Navbar
