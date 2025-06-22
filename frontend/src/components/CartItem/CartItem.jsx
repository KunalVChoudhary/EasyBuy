import { useState } from 'react'
import styles from './CartItem.module.scss'
import { useDeleteCartItemMutation, usePostCartItemMutation, useUpdateCartItemMutation } from '../../redux/apiSlice/apiCartSlice'
import { toast } from 'react-toastify';

function CartItem({item}) {

  const [updateCartItem, { isLoading: isCartUpdateLoading, isSuccess: isCartUpdateSuccess, isError: isCartUpdateError, data: cartUpdateData, error: cartUpdateError }] = useUpdateCartItemMutation();

  const [deleteCartItem, { isLoading: isCartDeleteLoading, isSuccess: isCartDeleteSuccess, isError: isCartDeleteError, data: cartDeleteData, error: cartDeleteError }] = useDeleteCartItemMutation();

  const [inputDisabled, setInputDisabled] = useState(true)
  const [quantityInput, setQuantityInput] = useState(item.quantity || 1)
  const [quantityChangeButton, setQuantityChangeButton] = useState(true)

  const handleChange=(e)=>{
    setQuantityInput(e.target.value)
  }

  const handleUpdateBtnClick = async ()=>{
    setInputDisabled(true)
    setQuantityChangeButton(true)

    try {
      await updateCartItem({
          productId: item.productId._id,
          quantity: quantityInput
        }).unwrap();
      toast.success("Updated successfully");
    } 
    catch (err) {
      if (err.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error("Something went wrong.");
      }
    }
  }

  const handleRemoveBtn = async () => {
    try {
      await deleteCartItem({ productId: item.productId._id }).unwrap();
      toast.success('Item removed from cart successfully');
    } 
    catch (err) {
      if (err.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error("Something went wrong. Deletion Failed");
      }
    }
  }


  let itemPrice=((item.productId.price*100)/(100-(item.productId.discountPercentage))).toFixed(2)
  return (
    <>
      <div className={`${styles['CartItem']} container p-2`}>
        <div className={`p-2 d-flex`}>
          <div className={`p-2 d-flex justify-content-center`}>
            <img className={`${styles['CartItemImg']} rounded`} src={`${item.productId.thumbnail}`} alt="thumbnails" />
          </div>
          <div className={`ps-2 d-flex flex-column justify-content-center flex-grow-1`}>
            <p className='h5'>{item.productId.title}</p>
            <p className='fw-lighter lh-sm pb-2'>{item.productId.brand}</p>
            <p className='fs-6'>{item.productId.description}</p>
          </div>
        </div>
        <div className={`d-flex justify-content-between p-2`}>
          <div className={`d-flex justify-content-start`}>
            <div className='d-flex'>
              <p className='fs-6 my-2'>Quantity: </p>
              <input type="number" name="itemQuantity" min={1} max={10} step={1} className="form-control form-control-sm m-2" readOnly={inputDisabled} value={quantityInput} onChange={handleChange} />
            </div>
            <div className='m-2'>
              <button className={`btn btn-outline-primary btn-sm ${quantityChangeButton? '' : 'd-none'}`} onClick={()=>{
                setInputDisabled(false)
                setQuantityChangeButton(false)
              }}>Change Quantity</button>
              <button className={`btn btn-outline-success btn-sm ${quantityChangeButton? 'd-none' : ''}`} onClick={handleUpdateBtnClick}>Update Quantity</button>
            </div>
          </div>
          <div className="d-flex m-2">
              <button className={`btn btn-outline-danger btn-sm`} onClick={handleRemoveBtn}>Remove Item</button>
            </div>
        </div>
        <div className={`d-flex justify-content-between p-2`}>
          <div className='d-flex align-items-center mb-2'>
              {
                  [...Array(5)].map((_, i) => {
                      const starValue = i + 1;
                      const src =
                          item.productId.rating >= starValue
                              ? 'images/star-full-icon.png'
                              : item.productId.rating >= starValue - 0.5
                              ? 'images/star-half-icon.png'
                              : 'images/star-empty-icon.png';
                      return (
                      <img className={`${styles.starimg} me-1`} key={i} src={src} alt="star" />
                      );
                  })
              }
          </div>
          <div className='d-flex'>
            <p className='fs-6'>Price : </p>
            <p className='h6'>${(itemPrice * item.quantity).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartItem