import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { ToastContainer } from 'react-toastify'
import WishlistItemList from '../WishlistItemList/WishlistItemList'


function WishlistRoute() {
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <div className='page-wrapper'>
        <div className='content-area'>
          <WishlistItemList />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default WishlistRoute