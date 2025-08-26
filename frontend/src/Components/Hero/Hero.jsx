import React from 'react'
import './Hero.css'
import hand_icon from'../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_img from '../Assets/hero_image.png'

const Hero = ({ newCollectionsRef }) => {
  const handleScrollView = () => {
    newCollectionsRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className='hero'>

      <div className="hero-left">
        <div>
            <div className="hero-hand-icon">
                <p>Trải nghiệm</p>
                <img src={hand_icon} alt='' />
            </div>

            <p>siêu phẩm mới</p>
        </div>

        <div
          className="hero-latest-btn"
          onClick={handleScrollView}
        >
            <div>Xem ngay</div>
            <img src={arrow_icon} alt='' />
        </div>

      </div>

      <div className="hero-right">
        <img src={hero_img} alt="" />
      </div>
    </div>
  )
}

export default Hero
