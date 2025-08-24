import React, { useContext} from 'react'
import './CSS/ShopPlatform.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'
import { formatPrice } from '../utils/formatPrice'

const ShopPlatform = (props) => {
  const {allProducts} = useContext(ShopContext);

  return (
    <div className='shop-platform'>
      <img className='shop-platform-banner' src={props.banner} alt="" />

      <div className="shop-platform-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>

        <div className="shop-platform-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="shop-platform-products">
        {(() => {
          const filteredProducts = allProducts.filter(product => {
            console.log('Checking product:', product.platform, 'vs', props.platform, 'Type:', typeof product.platform, typeof props.platform);
            return props.platform === product.platform;
          });
          
          console.log('Filtered products count:', filteredProducts.length);
          
          if (filteredProducts.length === 0) {
            return <p>Hiện tại không có tựa game nào cho nền tảng: {props.platform}</p>;
          }
          
          return filteredProducts.map((product, index) => {
            return <Item
                key={index}
                id={product.id}
                name={product.name}
                image={product.image}
                new_price={formatPrice(product.new_price)}
                old_price={formatPrice(product.old_price)}
            />
          });
        })()}
      </div>

      <div className="shop-platform-loadmore">
        Explore more
      </div>
    </div>
  )
}

export default ShopPlatform
