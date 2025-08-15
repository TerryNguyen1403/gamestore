import React, { useContext } from 'react'
import './CartProducts.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartProducts = () => {
    const {
        all_product,
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

        {all_product.map((product) => {
            if (cartProducts[product.id] > 0) {
                return (
                    <div>
                        <div className="cartProducts-format cartProducts-format-main">
                            <img src={product.image} alt="" className='carticon-product-icon'/>
                            <p>{product.name}</p>
                            <p>{product.new_price} &#8363;</p>
                            <button className='cartProducts-quantity'>
                                {cartProducts[product.id]}
                            </button>
                            <p>{product.new_price * cartProducts[product.id]} &#8363;</p>
                            <img
                                className='cartProducts-remove-icon'
                                src={remove_icon} alt=""
                                onClick={() => {
                                    removeFromCart(product.id)
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
                <h1>cart Total</h1>

                <div>
                    <div className="cartProducts-total-product">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>

                    <hr />

                    <div className="cartProducts-total-product">
                        <p>Shipping fee</p>
                        <p>Free</p>
                    </div>

                    <hr />

                    <div className="cartProducts-total-product">
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>
                </div>

                <button>Process to checkout</button>

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
