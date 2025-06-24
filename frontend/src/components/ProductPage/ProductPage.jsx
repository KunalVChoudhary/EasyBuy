import React, { useEffect, useState } from 'react'
import { usePostCartItemMutation } from '../../redux/apiSlice/apiCartSlice';
import { usePostWishListItemMutation } from '../../redux/apiSlice/apiWishListSlice';
import { toast } from 'react-toastify';

function ProductPage({productId}) {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [postCartItem, { isLoading: isCartLoading, isSuccess: isCartSuccess, isError: isCartError, data: cartData, error: cartError }] = usePostCartItemMutation();

    const [postWishListItem, { isLoading: isWishLoading, isSuccess: isWishSuccess, isError: isWishError, data: wishData, error: wishError }] = usePostWishListItemMutation();

    useEffect(() => {
        const fetchProduct = async () => {
        try {
            setIsLoading(true);
            setIsError(false);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/product/${productId}`, {
            method: 'GET',
            credentials: 'include'
            });

            if (!res.ok) throw new Error('Failed to fetch product');

            const { product: data } = await res.json();
            setProduct(data);
        } catch (error) {
            console.error(error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
        };

        fetchProduct();
    }, []);


    //cart
    const onAddToCart = () => {
        postCartItem({
        productId: product._id,
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
    const onAddToWishlist = () => {
        postWishListItem({
        productId: product._id
        });
        
    };

    useEffect(() => {
            if (isWishSuccess) {
                toast.success(wishData.message);
            } else if (isWishError) {
                toast.error(wishError.data.message);
            }
    }, [isWishSuccess, isWishError]);

    if (isLoading) {
        return (
        <div className='d-flex justify-content-center align-items-center w-100' >
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>)
    }

    if (isError){
        return (
            <div className='d-flex justify-content-center align-items-center w-100 flex-grow-1' >
                <img src="/images/error-icon.png" alt="" />
                <p className='fs-4'>Error loading product. Please try again.</p>
            </div>
        )
    }


    return (
        <div className='container-lg p-2'>
            <div className="row justify-content-center">
                <div className='col-lg-5 col-sm-8'>
                    <div className="row col-12  border border-secondary-subtle border-3 rounded-2 justify-content-center mx-auto bg-body-tertiary">
                        <div id="productCarousel" className="carousel carousel-dark slide " data-bs-ride="carousel">

                            <div className="carousel-indicators">
                            {product.images.map((_, index) => (
                                <button
                                key={index}
                                type="button"
                                data-bs-target="#productCarousel"
                                data-bs-slide-to={index}
                                className={`text-white ${index === 0 ? 'active' : ''}`}
                                aria-current={index === 0 ? 'true' : undefined}
                                aria-label={`Slide ${index + 1}`}
                                ></button>
                            ))}
                            </div>

                            <div className="carousel-inner">
                            {product.images.map((img, index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <img src={img} className="d-block w-100 rounded" alt={`product-${index}`} />
                                </div>
                            ))}
                            </div>
                            
                            <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#productCarousel"
                            data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#productCarousel"
                            data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

                </div>
                <div className="col-lg-7">
                    <h2>{product.title}</h2>
                    <p className="text-muted mb-2">{product.brand} | <span className="badge bg-info text-dark">{product.category}</span></p>
                    <h4 className="text-danger">
                        ${product.price.toFixed(2)}{" "}
                        <small className="text-muted fs-6">({product.discountPercentage}% off)</small>
                    </h4>
                    <p className="text-secondary">{product.description}</p>

                    <ul className="list-unstyled mb-3">
                        <li><strong>SKU:</strong> {product.sku}</li>
                        <li><strong>Stock:</strong> {product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}</li>
                        <li><strong>Min. Order Qty:</strong> {product.minimumOrderQuantity}</li>
                        <li><strong>Availability:</strong> {product.availabilityStatus}</li>
                        <li><strong>Weight:</strong> {product.weight} kg</li>
                        <li><strong>Dimensions:</strong> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm</li>
                        <li><strong>Warranty:</strong> {product.warrantyInformation}</li>
                        <li><strong>Shipping:</strong> {product.shippingInformation}</li>
                        <li><strong>Return Policy:</strong> {product.returnPolicy}</li>
                        <li>
                        <strong>Tags:</strong>{" "}
                        {product.tags.map(tag => (
                            <span className="badge bg-secondary me-1" key={tag}>{tag}</span>
                        ))}
                        </li>
                    </ul>

                    <div className="d-flex gap-3">
                        <button
                        className="btn btn-outline-primary"
                        onClick={onAddToCart}
                        disabled={product.stock === 0}
                        >
                        Add to Cart
                        </button>
                        <button className="btn btn-outline-danger" onClick={onAddToWishlist}>
                        Add to Wishlist
                        </button>
                    </div>

                    <div className="mt-4">
                        <img src={product.meta.qrCode} alt="QR Code" width="100" />
                        <p className="mt-2"><strong>Barcode:</strong> {product.meta.barcode}</p>
                    </div>
                </div>
            </div>
            <div>
                <div className='py-3 my-3 border-bottom border-3 border-secondary-subtle'><p className='h4'>Customer Reviews</p></div>
                <div className='py-2'>
                    {product.reviews.map((review, index) => (
                        <div key={index} className="border p-3 mb-3 rounded bg-light">
                            <p className="mb-1"><strong>{review.reviewerName}</strong> - <small className="text-muted">{new Date(review.date).toLocaleDateString()}</small></p>
                            <div className='d-flex align-items-center mb-1'>
                                <p className="">Rating:</p>
                                <p className='d-flex align-items-center ps-1'>
                                    {
                                        [...Array(5)].map((_, i) => {
                                            const starValue = i + 1;
                                            const src =
                                                review.rating >= starValue
                                                    ? '/images/star-full-icon.png'
                                                    : review.rating >= starValue - 0.5
                                                    ? '/images/star-half-icon.png'
                                                    : '/images/star-empty-icon.png';
                                    
                                            return (
                                            <img className={` me-1`} key={i} src={src} alt="star" />
                                            );
                                        })
                                    }
                                </p>
                            </div>
                            <p className="mb-0">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductPage