import CartItemList from '../CartItemList/CartItemList'
import CartBill from '../CartBill/CartBill'
import { useGetCartItemsQuery } from '../../redux/apiSlice/apiCartSlice'
import styles from './CartPage.module.scss'

function CartPage() {
  const { data, isLoading, isSuccess, isError, error } = useGetCartItemsQuery();

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
          <p className='fs-4'>Error loading cart: Unknown error</p>
        </div>
    )
  }

  return (
    <div className={`${styles['CartPageContainer']} container`}>
      <div className={` row d-flex flex-row justify-content-center`}>
        <div className={` col-10 col-md-7 p-3`}>
          <CartItemList itemList={data} />
        </div>
        <div className={`col-12 col-md-5 p-3 d-flex justify-content-center align-items-start`}>
          <CartBill itemList={data} />
        </div>
      </div>
    </div>
  );
}


export default CartPage