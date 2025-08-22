import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import add_product_icon from '../../assets/Product_Cart.svg'
import list_product_icon from '../../assets/Product_list_icon.svg'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link
            to={'/add-product'}
            style={{ textDecoration: 'none' }}
        >
            <div className="sidebar-item">
                <img src={add_product_icon} alt="" />
                <p>Thêm sản phẩm</p>
            </div>
        </Link>

        <Link
            to={'/list-products'}
            style={{ textDecoration: 'none' }}
        >
            <div className="sidebar-item">
                <img src={list_product_icon} alt="" />
                <p>Danh sách sản phẩm</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar
