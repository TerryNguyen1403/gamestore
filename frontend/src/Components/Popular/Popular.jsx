import React, { useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Item/Item'

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/product/popular-products')
      .then((res) => res.json())
      .then((data) => setPopularProducts(data))
  }, []);

  return (
    <div className='popular'>
      <h1>GAME HOT</h1>
      <hr />

      <div className="popular-item">
        {popularProducts.map((product, index) => {
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
