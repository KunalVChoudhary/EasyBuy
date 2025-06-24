import {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import styles from './ProductCard.module.scss'
import { usePostCartItemMutation } from '../../redux/apiSlice/apiCartSlice';
import { toast } from 'react-toastify';
import { usePostWishListItemMutation } from '../../redux/apiSlice/apiWishListSlice';

export default function ProductCard({productDetail}) {

    const navigate = useNavigate()

    //cart
    const [postCartItem, { isLoading: isCartLoading, isSuccess: isCartSuccess, isError: isCartError, data: cartData, error: cartError }] = usePostCartItemMutation();

    const handleAddToCart = () => {
        postCartItem({
        productId: productDetail._id,
        quantity: 1,
        });
        
    };

    useEffect(() => {
        if (isCartSuccess) {
            toast.success(cartData.message);
        } else if (isCartError) {
            toast.error(cartError.data.message);
        }
    }, [isCartSuccess, isCartError]);

    //wishlist
    const [postWishListItem, { isLoading: isWishLoading, isSuccess: isWishSuccess, isError: isWishError, data: wishData, error: wishError }] = usePostWishListItemMutation();

    const handleAddToWishList = () => {
        postWishListItem({
        productId: productDetail._id
        });
        
    };

    useEffect(() => {
        if (isWishSuccess) {
            toast.success(wishData.message);
        } else if (isWishError) {
            toast.error(wishError.data.message);
        }
    }, [isWishSuccess, isWishError]);

    //store
    const displayTheme=useSelector(state=>state.displayTheme)
    
    return (
        
        <>
            <div className={`${styles.productCard} card p-2 ${styles[displayTheme]}`}>
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
                    <h5 className={`card-title m-0 fs-5 text-truncate`} onClick={()=>{navigate(`/productpage/${productDetail._id}`)}}> {productDetail.title}</h5>
                    <p className={`card-text fw-lighter m-0 mb-2`} onClick={()=>{navigate(`/productpage?id=${productDetail._id}`)}}>{productDetail.brand}</p>
                    <p className={`card-text lh-sm mb-1 ${styles.truncate2}`} onClick={()=>{navigate(`/productpage?id=${productDetail._id}`)}}>{productDetail.description}</p>
                    <div className='d-flex align-items-center mb-2' onClick={()=>{navigate(`/productpage?id=${productDetail._id}`)}}>
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
                            
                            <img className={`${styles.starimg} mx-1`} src={'images/wishlist-icon.png'} alt="wishlist" onClick={handleAddToWishList} />
                            <img className={`${styles.starimg} mx-2`} src={`images/cart-${(displayTheme=='dark')?'light':'dark'}-icon.png`} alt="cart" onClick={handleAddToCart} />
                        </div>
                        <div className='d-flex align-items-end' onClick={()=>{navigate(`/productpage?id=${productDetail._id}`)}}>
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