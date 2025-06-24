import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { ToastContainer } from 'react-toastify'
import ProductPage from '../ProductPage/ProductPage'
import { useParams } from 'react-router'


function ProductRoute() {
    const productId = useParams().productId

    return (
        <div>
        <ToastContainer/>
        <Navbar />
        <div className='page-wrapper'>
            <div className='content-area'>
            <ProductPage productId={productId}/>
            </div>
            <Footer />
        </div>
        </div>
    )
}

export default ProductRoute