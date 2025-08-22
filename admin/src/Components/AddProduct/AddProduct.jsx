import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: '',
        old_price: '',
        new_price: '',
        platform: 'Windows',
        image: ''
    })

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({
            ...productDetails,
            [e.target.name]: e.target.value
        })
    }

    const addProduct = async () => {
        try {
            let product = productDetails;
            let formData = new FormData();
            formData.append('product', image);

            const response = await fetch('http://localhost:4000/api/product/upload-image', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });

            const responseData = await response.json();

            if (responseData && responseData.img_url) {
                product.image = responseData.img_url;
                const addRes = await fetch('http://localhost:4000/api/product/add-product', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product)
                });

                await addRes.json();
                alert('Thêm sản phẩm thành công');

            } else {
                alert('Thêm sản phẩm không thành công');
            }
        } catch (error) {
            console.error('Lỗi upload image:', error);
        }
    }

  return (
    <div className='add-product'>
        <div className="add-product-itemfield">
            <p>Tên sản phẩm</p>
            <input
                value={productDetails.name}
                onChange={changeHandler}
                type="text"
                name="name"
                placeholder='Nhập tên sản phẩm'
            />
        </div>

        <div className="add-product-price">
            <div className="add-product-itemfield">
                <p>Giá cũ</p>
                <input
                    value={productDetails.old_price}
                    onChange={changeHandler}
                    type="text"
                    name='old_price'
                    placeholder='Nhập giá cũ'
                />
            </div>

            <div className="add-product-itemfield">
                <p>Giá mới</p>
                <input
                    value={productDetails.new_price}
                    onChange={changeHandler}
                    type="text"
                    name='new_price'
                    placeholder='Nhập giá mới'
                />
            </div>
        </div>

        <div className="add-product-itemfield">
            <p>Nền tảng</p>
            <select
                value={productDetails.platform}
                onChange={changeHandler}
                name="platform"
                className='add-product-selector'
            >
                <option value="Windows">Windows</option>
                <option value="Playstation">Playstation</option>
                <option value="Nintendo">Nintendo</option>
            </select>
        </div>

        <div className="add-product-itemfield">
            <label htmlFor="file-input">
                <img
                    src={
                        image ? URL.createObjectURL(image) : upload_area
                    }
                    className='add-product-thumbnail-img'
                    alt=""
                />
            </label>

            <input
                onChange={imageHandler}
                type="file"
                name='image'
                id='file-input'
                hidden
            />
        </div>

        <button
            onClick={() => { addProduct() }}
            className='add-product-btn'
        >
            Thêm sản phẩm
        </button>
    </div>
  )
}

export default AddProduct
