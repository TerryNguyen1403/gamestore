import React, { createContext, useEffect, useState} from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
        let cart = {};

        for (let index = 0; index < 300+1; index++){
            cart[index] = 0;
        }

        return cart;
    }

const ShopContextProvider = (props) => {
    const [allProducts, setAllProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState(getDefaultCart());

    // Thêm state theo dõi auth
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('auth-token'));

    useEffect(() => {
        const fetchProducts = async () => {
            try {
            const response = await fetch(`http://localhost:4000/api/product/list-products`);
            const data = await response.json();
            setAllProducts(data);

            } catch (error) {
                console.error('Xảy ra lỗi khi fetch sản phẩm: ', error);
            }
        };
        fetchProducts();
        
        // if (localStorage.getItem('auth-token')){
        //     fetch('http://localhost:4000/api/cart/get-cart', {
        //         method: 'POST',
        //         headers: {
        //             Accept: 'application/json',
        //             'auth-token': `${localStorage.getItem('auth-token')}`,
        //             'Content-Type': 'application/json'
        //         },
        //         body: ""
        //     })
        //         .then((res) => res.json())
        //         .then((data) => setCartProducts(data))
        // }

        const fetchCartData = async () => {
            const token = localStorage.getItem('auth-token');
            if (token){
                try {
                    const response = await fetch('http://localhost:4000/api/cart/get-cart', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'auth-token': token
                        }
                    });
                    const data = await response.json();
                    if (data) {
                        setCartProducts(data);
                    }
                } catch (error) {
                    console.error("Error fetching cart:", error);
                }
            }
        }

        fetchCartData();
    }, [isAuthenticated]);

    // Thêm sản phảm vào giỏ hàng
    const addToCart = (productId) => {
        setCartProducts((prevProducts) => ({
            ...prevProducts,
            [productId]: prevProducts[productId]+1
        }));

        if(localStorage.getItem('auth-token')) {
            fetch(`http://localhost:4000/api/cart/add-to-cart`,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(({"productId": productId}))
            })
                .then((res) => res.json())
                .then((data) => console.log(data))
        }
    };

    // Xóa sản phẩm khỏi giỏ hàng
    const removeFromCart = (productId) => {
        setCartProducts((prevProducts) => ({
            ...prevProducts,
            [productId]: prevProducts[productId]-1
        }))

        if (localStorage.getItem('auth-token')) {
            fetch(`http://localhost:4000/api/cart/remove-from-cart`,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(({"productId": productId}))
            })
                .then((res) => res.json())
                .then((data) => console.log(data))
        }
    }

    // Lấy chi tiết sản phẩm ở Cart
    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartProducts) {
            if (cartProducts[item] > 0) {
                let itemInfo = allProducts.find(
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

    // Reset giỏ hàng
    const resetCart = () => {
        setCartProducts(getDefaultCart());
    }

    // Cập nhật auth status
    const updateAuthStatus = (status) => {
        setIsAuthenticated(status);
    }

    // Thêm các chức năng vào userContext
    const contextValue = {
        allProducts,
        cartProducts,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalItems,
        updateAuthStatus,
        resetCart
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;