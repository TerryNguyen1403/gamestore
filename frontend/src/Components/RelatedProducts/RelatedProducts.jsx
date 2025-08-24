import React, { useEffect, useState } from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import { formatPrice } from '../../utils/formatPrice'

const RelatedProducts = ({ platform }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
      if (platform){
        fetch(`http://localhost:4000/api/product/related-products/${platform}`)
          .then((res) => res.json())
          .then((data) => setRelatedProducts(data))
          .catch((e) => console.error(e))
      }
    }, [platform]);

  return (
    <div className='related-products'>
        <h1>Game cùng nền tảng </h1>

        <hr />

        <div className="related-products-item">
            {relatedProducts.map((product, index) => {
                return <Item
                    key={index}
                    id={product.id}
                    name={product.name}
                    image={product.image}
                    new_price={formatPrice(product.new_price)}
                    old_price={formatPrice(product.old_price)}
                />
            })}
        </div>
    </div>
  )
}

export default RelatedProducts
