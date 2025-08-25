import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../Item/Item'
import { formatPrice } from '../../utils/formatPrice'

const NewCollections = () => {
  const [newCollections, setNewCollections] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/product/new-collection')
      .then((res) => res.json())
      .then((data) => setNewCollections(data))
  }, [])

  return (
    <div className='new-collections'>
      <h1>Các tựa game mới</h1>
      <hr />

      <div className="collections">
        {newCollections.map((product, index) => {
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

export default NewCollections
