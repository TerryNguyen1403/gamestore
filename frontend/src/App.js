
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import banner_pc from './Components/Assets/banner_pc.png'
import banner_ps5 from './Components/Assets/banner_ps5.png'
import banner_nintendo from './Components/Assets/banner_nintendo.png'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/pc' element={<ShopCategory banner={banner_pc} category='pc'/>} />
          <Route path='/ps5' element={<ShopCategory banner={banner_ps5} category='ps5'/>} />
          <Route path='/nintendo' element={<ShopCategory banner={banner_nintendo} category='nintendo'/>} />

          <Route path='product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>

          <Route path='/cart' element={<Cart />} />

          <Route path='/login' element={<LoginSignup />} />

        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
