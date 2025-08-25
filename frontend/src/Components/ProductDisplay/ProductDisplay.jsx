import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'
import { formatPrice } from '../../utils/formatPrice'

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);

  return (
    <div className='productDisplay'>

      <div className="productDisplay-left">
        <div className="productDisplay-img-list">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
        </div>

        <div className="productDisplay-img">
            <img className='productDisplay-main-img' src={product.image} alt="" />
        </div>
      </div>

      <div className="productDisplay-right">
        <h1>{product.name}</h1>
        
        <div className="productDisplay-right-star">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(122)</p>
        </div>

        <div className="productDisplay-right-prices">
            <div className="productDisplay-right-old-price">
                {formatPrice(product.old_price)} &#8363;
            </div>

            <div className="productDisplay-right-new-price">
                {formatPrice(product.new_price)} &#8363;
            </div>
        </div>

        <div className="productDisplay-right-description">
            {product.description}
        </div>

        <button
            onClick={() => {addToCart(product.id)}}
        >
            Thêm vào giỏ hàng
        </button>

        <p className='productDisplay-right-category'>
            <span>Nền tảng: </span> {product.platform}
        </p>

      </div>
    </div>
  )
}

export default ProductDisplay
