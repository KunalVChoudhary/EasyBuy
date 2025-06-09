import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import styles from './ProductCard.module.scss'

export default function ProductCard({productDetail}) {
    //onclick on productCard not added
    // wishlist and cart onclick not added
    console.log(productDetail);

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
                            
                            <img className={`${styles.starimg} mx-1`} src={'images/wishlist-icon.png'} alt="wishlist" />
                            <img className={`${styles.starimg} mx-2`} src={`images/cart-${(displayTheme=='dark')?'light':'dark'}-icon.png`} alt="cart" />
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