import React from 'react'
import './NavBar.css'
import navLogo from '../../assets/nav-logo.png'
import adminProfile from '../../assets/admin.png'
import dropdown from '../../assets/arrow_icon.svg'

const NavBar = () => {
  return (
    <div className='navbar'>
      <img src={navLogo} alt="" className="nav-logo" />
      
      <div className="nav-right">
        <img src={adminProfile} alt="" className='admin-profile' />
        <img src={dropdown} alt="" className='dropdown-icon'/>
      </div>
    </div>
  )
}

export default NavBar
