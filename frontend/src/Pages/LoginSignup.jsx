import React from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Đăng ký</h1>

        <div className="loginsignup-fields">
          <input type="text" placeholder='Tên của bạn' />
          <input type="email" placeholder='Địa chỉ email' />
          <input type="password" placeholder='Mật khẩu' />
        </div>

        <button>Tiếp tục</button>

        <p className="loginsignup-login">
          Đã có tài khoản?
          <span> Đăng nhập tại đây</span>
        </p>

        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>Tôi đồng ý các điều khoản của trang web</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
