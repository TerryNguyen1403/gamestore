import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrum from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const { allProducts } = useContext(ShopContext);
  const { productId } = useParams();
  const product = allProducts.find((productItem) => productItem.id === Number(productId));

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product = {product}/>
      <DescriptionBox />
      <RelatedProducts platform={product.platform} />
    </div>
  )
}

export default Product
