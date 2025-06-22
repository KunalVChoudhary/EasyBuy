import React from 'react'
import { useDeleteWishListItemMutation } from '../../redux/apiSlice/apiWishListSlice';
import { toast } from 'react-toastify';
import styles from './WishlistItem.module.scss'
import { useNavigate } from 'react-router-dom';
import { usePostCartItemMutation } from '../../redux/apiSlice/apiCartSlice';

function WishlistItem({ item }) {

    const navigate= useNavigate()

    const originalPrice = ((item.price * 100) / (100 - item.discountPercentage)).toFixed(2);

    const [deleteWishlistItem, { isLoading: isWishlistDeleteLoading, isSuccess: isWishlistDeleteSuccess, isError: isWishlistDeleteError, data: WishlistDeleteData, error: WishlistDeleteError }] = useDeleteWishListItemMutation();

    const [postCartItem, { isLoading: isCartLoading, isSuccess: isCartSuccess, isError: isCartError, data: cartData, error: cartError }] = usePostCartItemMutation();

    const handleRemoveBtn=async ()=>{
        try {
            await deleteWishlistItem({ productId: item._id }).unwrap();
            toast.success('Item removed from Wishlist successfully');
            } 
            catch (err) {
            if (err.status === 401) {
                toast.error("Session expired. Please log in again.");
            } else {
                toast.error("Something went wrong. Deletion Failed");
            }
        }
    }

    const handleUpdateCartBtn = async ()=>{
        try {
            await postCartItem({
            productId: item._id,
            quantity: 1, }).unwrap();
            toast.success('Item added to Cart successfully');
            } 
            catch (err) {
            if (err.status === 401) {
                toast.error("Session expired. Please log in again.");
            } else {
                toast.error("Something went wrong. Addition to Cart Failed");
            }
        }
    }

    return (
        <div className={`${styles['wish-card']} card mb-3 shadow`}>
        <div className="row g-0">
            <div className="col-md-4 d-flex align-items-center justify-content-center p-2">
            <img
                src={item.thumbnail}
                className="img-fluid rounded-start"
                alt={item.title}
            />
            </div>
            <div className="col-md-8">
            <div className="card-body">
                <h5 className={`${styles['wish-card-title']} card-title m-0`} onClick={()=>{navigate(`/productpage/${item._id}`)}}>{item.title}</h5>
                <div className='card-text mb-2'><small className="text-muted">{item.brand}</small></div>
                <p className="card-text fs-6 lh-sm mb-1">{item.description}</p>
                <p className="card-text mb-1">
                <strong>Price:</strong>{' '}
                <span className="text-muted text-decoration-line-through">${originalPrice}</span>{' '}
                <span className="text-success">${item.price}</span>
                </p>
                <div className="card-text mb-1">
                    <div className='d-flex align-items-center'>
                        <strong>Rating:</strong>
                        <div className='ps-2 d-flex align-items-center'>
                            {
                                [...Array(5)].map((_, i) => {
                                    const starValue = i + 1;
                                    const src =
                                        item.rating >= starValue
                                            ? 'images/star-full-icon.png'
                                            : item.rating >= starValue - 0.5
                                            ? 'images/star-half-icon.png'
                                            : 'images/star-empty-icon.png';
                                    return (
                                    <img className={`${styles.starimg} me-1`} key={i} src={src} alt="star" />
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="card-text mb-1">
                    <strong>Availability:</strong>{' '}{item.availabilityStatus}
                </div>
                <div className="card-text mb-2">
                    <strong>Return Policy:</strong>{' '}{item.returnPolicy}
                </div>
                <div className="d-flex gap-2 mt-2">
                    <button className="btn btn-sm btn-outline-danger" onClick={handleRemoveBtn}>Remove</button>
                    <button className="btn btn-sm btn-outline-primary" onClick={handleUpdateCartBtn}>Move to Cart</button>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}


export default WishlistItem