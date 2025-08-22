import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  // Hiển thị tất cả sản phẩm
  const getAllProducts = async () => {
    await fetch('http://localhost:4000/api/product/list-products')
      .then((res) => res.json())
      .then((data) => { setAllProducts(data) })

  }

  useEffect(() => {
    getAllProducts();
  }, []);

  // Xóa sản phẩm
  const removeProduct = async (id) => {
    await fetch('http://localhost:4000/api/product/remove-product', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    })

    await getAllProducts();
    alert('Xóa sản phẩm thành công');
  }

  return (
    <div className='list-product'>
        <h1>Danh sách tất cả sản phẩm</h1>

        <div className="list-product-format-main">
          <p>Sản phẩm</p>
          <p>Tên</p>
          <p>Giá cũ</p>
          <p>Giá mới</p>
          <p>Nền tảng</p>
          <p>Xóa</p>
        </div>

        <div className="list-product-all-products">
          <hr />

          {allProducts.map((product, index) => {
            return (
              <>
              <div key={index} className="list-product-format-main list-product-format">
                <img
                    src={product.image} alt=""
                    className="list-product-product-image"
                />

                <p>{product.name}</p>
                <p>{product.old_price}</p>
                <p>{product.new_price}</p>
                <p>{product.platform}</p>

                <img
                    onClick={() => {
                      removeProduct(product.id);
                    }}
                    src={cross_icon} alt=""
                    className="list-product-remove-icon"
                />
              </div>
              <hr />
              </>
            )
          })}
        </div>
    </div>
  )
}

export default ListProduct
