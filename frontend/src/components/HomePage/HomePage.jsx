import React from 'react'
import styles from './HomePage.module.scss'
import Filter from '../Filter/Filter'
import ProductPage from '../ProductPage/ProductPage'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { ToastContainer } from 'react-toastify'

function HomePage() {
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <div className='page-wrapper'>
        <div className='content-area'>
          <div className={`${styles['homePageContainer']} d-flex justify-content-center `}>
              <div className={`row container-xxl d-flex justify-content-center p-0 m-0`}>
                  <div className={`${styles['filterContainer']} col-4 p-0 m-0`}>
                      <Filter/>
                  </div>
                  <div className={`${styles['productPageContainer']} col-8 p-0 m-0`}>
                      <ProductPage/>
                  </div>
              </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default HomePage