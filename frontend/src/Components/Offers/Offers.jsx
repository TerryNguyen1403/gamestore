import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'

const Offers = () => {
  return (
    <div className='offers'>
      <div className="offers-left">
        <h1>Ưu đãi</h1>
        <h1>Dành cho bạn</h1>
        <p>Hàng trăm tựa game với nhiều ưu đãi hấp dẫn</p>
        <button>Khám phá ngay</button>
      </div>

      <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  )
}

export default Offers
