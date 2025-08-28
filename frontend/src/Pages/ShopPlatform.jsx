import React, { useContext, useState} from 'react'
import './CSS/ShopPlatform.css'
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Item/Item'
import { formatPrice } from '../utils/formatPrice'
import { ChevronDown, Check } from 'lucide-react'

const ShopPlatform = (props) => {
  const {allProducts} = useContext(ShopContext);

  // State cho nút sắp xết
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Mặc định');

  // Các lựa chọn sắp xếp
  const sortOptions = [
    'Mặc định',
    'Giá: Tăng dần',
    'Giá: Giảm dần',
  ]

  const handleSortSelect = (option) => {
    setSelectedSort(option);
    setIsOpen(false);
  };

  return (
    <div className='shop-platform'>
      <img className='shop-platform-banner' src={props.banner} alt="" />

      <div className="shop-platform-indexSort">
        <p>
          <span>Game cho nền tảng {props.platform}</span>
        </p>

        {/* Nút sắp xếp */}

        <div className="shop-platform-sort">
          <button
            className='shop-platform-sort-button'
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >

            <div className="shop-platform-sort-text">
              <svg>
                <path d="M3 6h18M7 12h10m-7 6h4"/>
              </svg>
              <span>Sắp xếp</span>
            </div>

            <ChevronDown
              className={
                `chevron-down ${isOpen ? 'rotate' : ''}`
              }
            />

          </button>

          {/* Dropdown Menu */}

          <div
            className={`dropdown-menu ${isOpen ? 'visible' : 'invisible'}`}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <ul>
              {sortOptions.map((option, index) => (
                <li key={index}>
                  <button
                    className='option-button'
                    onClick={() => setSelectedSort(option)}
                  >
                    <span
                      className={`
                        option-text-span
                        ${
                        selectedSort === option
                          ? 'selected'
                          : 'not-selected'
                        }`
                      }
                    >
                      {option}
                    </span>
                    {selectedSort === option && (
                      <Check className="check-icon" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Hiển thị sản phẩm */}

      <div className="shop-platform-products">
        {(() => {
          const filteredProducts = allProducts.filter(product => {
            console.log('Checking product:', product.platform, 'vs', props.platform, 'Type:', typeof product.platform, typeof props.platform);
            return props.platform === product.platform;
          });
          
          console.log('Filtered products count:', filteredProducts.length);
          
          if (filteredProducts.length === 0) {
            return <p>Hiện tại không có tựa game nào cho nền tảng: {props.platform}</p>;
          }
          
          return filteredProducts.map((product, index) => {
            return <Item
                key={index}
                id={product.id}
                name={product.name}
                image={product.image}
                new_price={formatPrice(product.new_price)}
                old_price={formatPrice(product.old_price)}
            />
          });
        })()}
      </div>
    </div>
  )
}

export default ShopPlatform
