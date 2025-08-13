import React from 'react'
import './RelatedProducts.css'
import data_product from '../Assets/data'
import Item from '../Item/Item'

const RelatedProducts = () => {
  return (
    <div className='related-products'>
        <h1>Game cùng thể loại </h1>

        <hr />

        <div className="related-products-item">
            {data_product.map((product, index) => {
                return <Item
                    key={index}
                    id={product.id}
                    name={product.name}
                    image={product.image}
                    new_price={product.new_price}
                    old_price={product.old_price}
                />
            })}
        </div>
    </div>
  )
}

export default RelatedProducts
