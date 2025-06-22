import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './components/Signup/Signup'
import Login from './components/Signup/Login'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import HomePage from './components/HomePage/HomePage'
import { ToastContainer } from 'react-toastify'
import CartPage from './components/CartPage/CartPage'
import CartRoute from './components/CartRoute/CartRoute'

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
      <Route path='/' element={<HomePage />} />
      <Route path='/productpage:productId' element={
        <div>
          <ToastContainer position="top-right"/>
          lol
        </div>
      }/>

      <Route path='/cart' element={<CartRoute />}/>
    </Routes>
  )
}

export default App
