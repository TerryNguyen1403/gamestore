import React, { useContext } from 'react'
import './CartProducts.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import { formatPrice } from '../../utils/formatPrice'

const CartProducts = () => {
    const {
        allProducts,
        cartProducts,
        removeFromCart,
        getTotalCartAmount
    } = useContext(ShopContext);

  return (
    <div className='cartProducts'>
        <div className="cartProducts-format-main">
            <p>Sản phẩm</p>
            <p>Tên game</p>
            <p>Giá</p>
            <p>Số lượng</p>
            <p>Tổng tiền</p>
            <p>Xóa</p>
        </div>

        <hr />

        {allProducts.map((product) => {
            if (cartProducts[product.id] > 0) {
                return (
                    <div key={product.id}>
                        <div className="cartProducts-format cartProducts-format-main">
                            <img src={product.image} alt="" className='carticon-product-icon'/>
                            <p>{product.name}</p>
                            <p>{formatPrice(product.new_price)} ₫</p>
                            <button className='cartProducts-quantity'>
                                {cartProducts[product.id]}
                            </button>
                            <p>{formatPrice(product.new_price * cartProducts[product.id])} &#8363;</p>
                            <img
                                className='cartProducts-remove-icon'
                                src={remove_icon} alt=""
                                onClick={() => {
                                    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")){
                                        removeFromCart(product.id)
                                    }
                                }}
                            />
                        </div>
                        <hr />
                    </div>
                )
            }
            return null;
        })}

        <div className="cartProducts-down">

            <div className="cartProducts-total">
                <h1>Tổng đơn hàng</h1>

                <div>
                    <div className="cartProducts-total-product">
                        <p>Tạm tính</p>
                        <p>{formatPrice(getTotalCartAmount())} &#8363;</p>
                    </div>

                    <hr />

                    <div className="cartProducts-total-product">
                        <p>Shipping fee</p>
                        <p>Free</p>
                    </div>

                    <hr />

                    <div className="cartProducts-total-product">
                        <h3>Tổng cộng</h3>
                        <h3>{formatPrice(getTotalCartAmount())} &#8363;</h3>
                    </div>
                </div>

                <button>Đi đến thanh toán</button>

            </div>

            <div className="cartProducts-promocode">
                <p>Nhập mã giảm giá tại đây</p>

                <div className="cartProducts-promobox">
                    <input type="text" placeholder='Mã giảm giá'/>
                    <button>Nhập mã</button>
                </div>

            </div>
        </div>
    </div>
  )
}

export default CartProducts
