import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import styles from './ProductCard.module.scss'

export default function ProductCard(productDetail) {
    //onclick on productCard not added,height and width fix of both productCard and carousel
    // wishlist and cart onclick not added
    // const productDetail={
    //     "productId": 1,
    //     "title": "Essence Mascara Lash Princess",
    //     "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    //     "category": "beauty",
    //     "price": 9.99,
    //     "discountPercentage": 7.17,
    //     "rating": 4.94,
    //     "stock": 5,
    //     "tags": [
    //         "beauty",
    //         "mascara"
    //     ],
    //     "brand": "Essence",
    //     "sku": "RCH45Q1A",
    //     "weight": 2,
    //     "dimensions": {
    //         "width": 23.17,
    //         "height": 14.43,
    //         "depth": 28.01
    //     },
    //     "warrantyInformation": "1 month warranty",
    //     "shippingInformation": "Ships in 1 month",
    //     "availabilityStatus": "Low Stock",
    //     "reviews": [
    //         {
    //             "rating": 2,
    //             "comment": "Very unhappy with my purchase!",
    //             "date": "2024-05-23T08:56:21.618Z",
    //             "reviewerName": "John Doe",
    //             "reviewerEmail": "john.doe@x.dummyjson.com"
    //         },
    //         {
    //             "rating": 2,
    //             "comment": "Not as described!",
    //             "date": "2024-05-23T08:56:21.618Z",
    //             "reviewerName": "Nolan Gonzalez",
    //             "reviewerEmail": "nolan.gonzalez@x.dummyjson.com"
    //         },
    //         {
    //             "rating": 5,
    //             "comment": "Very satisfied!",
    //             "date": "2024-05-23T08:56:21.618Z",
    //             "reviewerName": "Scarlett Wright",
    //             "reviewerEmail": "scarlett.wright@x.dummyjson.com"
    //         }
    //     ],
    //     "returnPolicy": "30 days return policy",
    //     "minimumOrderQuantity": 24,
    //     "meta": {
    //         "createdAt": "2024-05-23T08:56:21.618Z",
    //         "updatedAt": "2024-05-23T08:56:21.618Z",
    //         "barcode": "9164035109868",
    //         "qrCode": "https://assets.dummyjson.com/public/qr-code.png"
    //     },
    //     "images": [
    //         "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
    //     ],
    //     "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
    // }

    const displayTheme=useSelector(state=>state.displayTheme)
    
    return (
        
        <>           
            <div className={`${styles.productCard} card p-2 ${styles[displayTheme]}`} >
                <div id="carouselExample" className={`card-img-top carousel ${(displayTheme === 'dark')? `${styles[displayTheme]}` : `carousel-dark ${styles[displayTheme]}`} slide`}>
                    <div className={`carousel-inner`}>
                        {productDetail.images.map((element, index) => (
                            <div className={`carousel-item${index === 0 ? ' active' : ''}`} key={index}>
                                <img src={element} className={`${styles.carouselImg} d-block`} alt={`Slide ${index + 1}`} loading="lazy"/>
                            </div>
                        ))}
                    </div>
                    <button className={`carousel-control-prev`} type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className={`carousel-control-prev-icon`} aria-hidden="true"></span>
                        <span className={`visually-hidden`}>Previous</span>
                    </button>
                    <button className={`carousel-control-next`} type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className={`carousel-control-next-icon`} aria-hidden="true"></span>
                        <span className={`visually-hidden`}>Next</span>
                    </button>
                </div>
                <div className={`card-body px-0 py-1`}>
                    <h5 className={`card-title m-0 fs-5 text-truncate`}> {productDetail.title}</h5>
                    <p className={`card-text fw-lighter m-0 mb-2`}>{productDetail.brand}</p>
                    <p className={`card-text lh-sm mb-1 ${styles.truncate2}`}>{productDetail.description}</p>
                    <div className='d-flex align-items-center mb-2'>
                        {
                            [...Array(5)].map((_, i) => {
                                const starValue = i + 1;
                                const src =
                                    productDetail.rating >= starValue
                                        ? 'images/star-full-icon.png'
                                        : productDetail.rating >= starValue - 0.5
                                        ? 'images/star-half-icon.png'
                                        : 'images/star-empty-icon.png';
                                

                                return (
                                <img className={`${styles.starimg} me-1`} key={i} src={src} alt="star" />
                                );
                            })
                        }
                    </div>
                    <div className={`${styles.productPriceContainer}card-text d-flex justify-content-between align-items-center`}>
                        <div className=''>
                            
                            <img className={`${styles.starimg} me-1`} src={'images/wishlist-icon.png'} alt="wishlist" />
                            <img className={`${styles.starimg} me-1`} src={'images/cart-icon.png'} alt="cart" />
                        </div>
                        <div className='d-flex align-items-end'>
                            <p className={`m-0 fs-5 fw-medium`}>${productDetail.price}</p>
                            <p className={`text-decoration-line-through fw-lighter m-0`}>
                                {((productDetail.price*100)/(100-(productDetail.discountPercentage))).toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>               
        </>
    )
}