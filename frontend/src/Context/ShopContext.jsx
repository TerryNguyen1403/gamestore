import React, { createContext, useEffect, useState} from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [allProducts, setAllProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    // Thêm states cho voucher
    const [voucherCode, setVoucherCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [voucherError, setVoucherError] = useState('');
    const [voucherSuccess, setVoucherSuccess] = useState('');

    // Thêm state theo dõi auth
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('auth-token'));

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
                    setCartItems(data);
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        }
    }

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
        fetchCartData();
    }, [isAuthenticated]);

    // Thêm sản phảm vào giỏ hàng
    const addToCart = async (productId) => {
        try {
            const token = localStorage.getItem('auth-token');
            if (!token) return;

            const response = await fetch('http://localhost:4000/api/cart/add-to-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `${token}`
                },
                body: JSON.stringify({ productId })
            });

            const data = await response.json();
            if (data.success){
                fetchCartData();
            }
        } catch (error) {
            console.error('Xảy ra lỗi khi thêm sản phẩm vào giỏ: ', error);
        }
    };

    // Xóa sản phẩm khỏi giỏ hàng
    const removeFromCart = (productId) => {
        setCartItems((prevProducts) => ({
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

    // Lấy tổng tiền của giỏ hàng
    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = allProducts.find(
                    (product) => product.id === Number(item)
                );

                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    // Hiện số lượng sản phẩm trong giỏ hàng
    const getTotalItems = () => {
        let totalItems = 0;

        for(const item in cartItems){
            if(cartItems[item] > 0){
                totalItems += cartItems[item];
            }
        }

        return totalItems;
    }

    // Reset giỏ hàng
    const resetCart = () => {
        setCartItems([]);
    }

    // Cập nhật auth status
    const updateAuthStatus = (status) => {
        setIsAuthenticated(status);
    }

    // Áp mã voucher
    const applyVoucher = async (voucherCode) => {
        try {
            const token = localStorage.getItem('auth-token');
            if (!token) {
                alert('Vui lòng đăng nhập trước khi áp mã giảm giá');
                return;
            }

            const response = await fetch('http://localhost:4000/api/voucher/get-voucher', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify({ voucherCode })
            });

            const data = await response.json();

            if (data.success) {
                setVoucherCode(voucherCode);
                setDiscount(data.discount);
                setVoucherError('');
                setVoucherSuccess('Mã giảm giá đã được áp dụng!')
            } else {
                setVoucherCode('');
                setDiscount(0);
                setVoucherError('Mã giảm giá không hợp lệ');
                setVoucherSuccess('');
            }
        } catch (error) {
            console.log('Xảy ra lỗi khi áp mã giảm giá: ', error);
            setVoucherCode('');
            setDiscount(0);
            setVoucherError('Xảy ra lỗi khi áp mã giảm giá');
        }
    }

    // Reset lại mục giảm giá nếu người dùng xóa hết input
    const resetDiscount = async (userId) => {
        setVoucherCode('');
        setDiscount(0);
        setVoucherError('');
        setVoucherSuccess('');

        try {
            await fetch('http://localhost:4000/api/cart/reset-voucher', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userId})
            });

        } catch (error) {
            console.error('Reset voucher thất bại: ', error);
        }
    }

    // Thêm các chức năng vào shopContext
    const contextValue = {
        allProducts,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalItems,
        updateAuthStatus,
        resetCart,
        applyVoucher,
        voucherCode,
        discount,
        voucherError,
        voucherSuccess,
        resetDiscount
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;