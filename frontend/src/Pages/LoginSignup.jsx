import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom"
import './CSS/LoginSignup.css'
import { ShopContext } from '../Context/ShopContext';

const LoginSignup = () => {
  let navigate = useNavigate();

  const { updateAuthStatus } = useContext(ShopContext);

  const [state, setState] = useState('Đăng nhập');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const login = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/user/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json();
      if (!data.token) {
        alert(data.message);
      } else {
        localStorage.setItem('auth-token', data.token);
        updateAuthStatus(true);
        navigate('/');
      }

    } catch (error) {
      console.error(error);
      alert('Xảy ra lỗi khi đăng nhập');
    }
    
  };

  const signup = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/user/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('auth-token', data.token);
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Có lỗi xảy ra khi đăng ký');
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>

        <div className="loginsignup-fields">
          {state === 'Đăng ký' && (
            <input
              name='name'
              value={formData.name}
              type="text"
              placeholder='Tên của bạn'
              onChange={changeHandler}
            />
          )}

          <input
            type="email"
            placeholder='Địa chỉ email'
            name='email'
            value={formData.email}
            onChange={changeHandler}
          />

          <input 
            type="password"
            placeholder='Mật khẩu'
            name='password'
            value={formData.password}
            onChange={changeHandler}
          />
        </div>

        <button
          onClick={() => {
            state === 'Đăng nhập' ? login() : signup()
          }}
        >
          {state}
        </button>

        {state === 'Đăng ký' && (
          <p className="loginsignup-login">
            Đã có tài khoản?
            <span
              onClick={() => {setState('Đăng nhập')}}
            >
              Đăng nhập tại đây
            </span>
          </p>
        )}

        {state === 'Đăng nhập' && (
          <p className="loginsignup-login">
            Chưa có tài khoản? 
            <span
              onClick={() => {setState('Đăng ký')}}
            >
              Đăng ký tại đây
            </span>
          </p>
        )}
      </div>
    </div>
  )
}

export default LoginSignup
