import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { ToastContainer } from 'react-toastify'
import CartPage from '../CartPage/CartPage'

function CartRoute() {
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <div className='page-wrapper'>
        <div className='content-area'>
          <CartPage />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default CartRoute