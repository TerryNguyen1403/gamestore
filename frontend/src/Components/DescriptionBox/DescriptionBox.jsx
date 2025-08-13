import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='description-box'>

        <div className="description-box-navigator">
            <div className="description-box-nav-box">
                Description
            </div>

            <div className="description-box-nav-box fade">
                Review (122)
            </div>
        </div>

        <div className="description-box-description">
            <p>Statistic</p>
            <p>Another statistic</p>
        </div>
    </div>
  )
}

export default DescriptionBox
