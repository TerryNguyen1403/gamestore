import React from 'react'
import './Popular.css'
import data_product from '../Assets/data'
import Item from '../Item/Item'

const Popular = () => {
  return (
    <div className='popular'>
      <h1>GAME MỚI RA MẮT</h1>
      <hr />

      <div className="popular-item">
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

export default Popular
