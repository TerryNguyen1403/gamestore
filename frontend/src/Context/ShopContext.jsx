import React, { createContext, useState} from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
        let cart = {};

        for (let index = 0; index < all_product.length+1; index++){
            cart[index] = 0;
        }

        return cart;
    }

const ShopContextProvider = (props) => {
    const [cartProducts, setCartProducts] = useState(getDefaultCart());

    // Thêm sản phảm vào giỏ hàng
    const addToCart = (productId) => {
        setCartProducts((prevProducts) => ({
            ...prevProducts,
            [productId]: prevProducts[productId]+1
        }));
        
        console.log(cartProducts);
    };

    // Xóa sản phẩm khỏi giỏ hàng
    const removeFromCart = (productId) => {
        setCartProducts((prevProducts) => ({
            ...prevProducts,
            [productId]: prevProducts[productId]-1
        }))
    }

    // Lấy chi tiết sản phẩm ở Cart
    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartProducts) {
            if (cartProducts[item] > 0) {
                let itemInfo = all_product.find(
                    (product) => product.id === Number(item)
                );

                totalAmount += itemInfo.new_price * cartProducts[item];
            }
        }
        return totalAmount;
    }

    // Hiện số lượng sản phẩm trong giỏ hàng
    const getTotalItems = () => {
        let totalItems = 0;

        for(const item in cartProducts){
            if(cartProducts[item] > 0){
                totalItems += cartProducts[item];
            }
        }

        return totalItems;
    }

    // Thêm các chức năng vào userContext
    const contextValue = { all_product, cartProducts, addToCart, removeFromCart, getTotalCartAmount, getTotalItems };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;