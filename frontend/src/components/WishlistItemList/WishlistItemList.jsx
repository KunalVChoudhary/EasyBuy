import React from 'react'
import { useGetWishListItemsQuery } from '../../redux/apiSlice/apiWishListSlice';
import WishlistItem from '../WishlistItem/WishlistItem';
import styles from './WishlistItemList.module.scss'

function WishlistItemList() {

    const { data, isLoading, isSuccess, isError, error } = useGetWishListItemsQuery();
    
    if (isLoading) {
    return (
    <div className='d-flex justify-content-center align-items-center w-100' >
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>)
    }

    if (isError) {
    if (error.status==401){
        return (
            <div className='d-flex justify-content-center align-items-center w-100'>
                <img src="images/error-icon.png" alt="" />
                <p className='fs-4'>{error.data.message}</p>
            </div>
        )
    }
    return (
        <div className='d-flex justify-content-center align-items-center w-100 flex-grow-1' >
            <img src="images/error-icon.png" alt="" />
            <p className='fs-4'>Error loading WishList: Unknown error</p>
        </div>
    )
    }

    return (
    <div className={`${styles['WishlistPageContainer']} container`}>
        <div className={` row d-flex flex-row justify-content-center`}>
            <div className={` col-10 col-md-8 p-3`}>
                <div className={`d-flex flex-column gap-3`}>
                    {data.map((item,index)=>{
                        return <WishlistItem item={item} key={index}/>
                    })}
                </div>
            </div>
        </div>
    </div>
    );
}

export default WishlistItemList