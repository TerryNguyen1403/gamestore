import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='news-letter'>
      <h1>Nhận thông báo về các ưu đãi thông qua email</h1>
      <p>Nhập email để nhận các thông báo mới nhất</p>

      <div>
        <input type="email" placeholder='Email của bạn' />
        <button>Gửi</button>
      </div>

    </div>
  )
}

export default NewsLetter
