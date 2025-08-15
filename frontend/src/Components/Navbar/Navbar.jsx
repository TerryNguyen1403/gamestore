// import React from 'react'
import './Navbar.css';

import logo from '../Assets/game-store-logo.png';
import cart_icon from '../Assets/cart_icon.png'
import dropdown_icon from '../Assets/nav_dropdown.png'

import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const { getTotalItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
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

        <li onClick={() => {setMenu('pc')}}>
            <Link style={{ textDecoration: 'none' }} to='/pc'>
                Windows
            </Link>
            {menu==='pc' ? <hr/> : <></>}
        </li>

        <li onClick={() => {setMenu('ps5')}}>
            <Link style={{ textDecoration: 'none' }} to='/ps5'>
                Playstation 5
            </Link>
            {menu==='ps5' ? <hr/> : <></>}
        </li>

        <li onClick={() => {setMenu('nintendo')}}>
            <Link style={{ textDecoration: 'none' }} to='/nintendo'>
                Nintendo Swtich
            </Link>
            {menu==='nintendo' ? <hr/> : <></>}
        </li>
      </ul>

      <div className="nav-login-cart">
        <Link to='/login'>
            <button>Đăng nhập</button>
        </Link>

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
