import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './components/Signup/Signup'
import Login from './components/Signup/Login'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import HomeRoute from './components/HomeRoute/HomeRoute'
import { ToastContainer } from 'react-toastify'
import CartPage from './components/CartPage/CartPage'
import CartRoute from './components/CartRoute/CartRoute'
import WishlistRoute from './components/WishlistRoute/WishlistRoute'
import ProductRoute from './components/ProductRoute/ProductRoute'

function App() {
  return (
    <Routes>
      <Route path='/login' element={
        <div>
          < ToastContainer position="top-right"/>
          <Login/>
        </div>
      }/>
      <Route path='/signup' element={
        <div>
          <ToastContainer position="top-right"/>
          <Signup/>
        </div>
      }/>
      <Route path='/' element={<HomeRoute />} />
      <Route path='/productpage/:productId' element={<ProductRoute />}/>

      <Route path='/cart' element={<CartRoute />}/>

      <Route path='/wishlist' element={<WishlistRoute />}/>
    </Routes>
  )
}

export default App
