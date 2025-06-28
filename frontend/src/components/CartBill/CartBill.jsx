import React from 'react'
import styles from './CartBill.module.scss'

function CartBill({itemList}) {
  let totalPrice = 0
  return (
    <div className={`${styles['CartBill']}  flex-column p-2`}>
      <div className={`h4 border-bottom border-3 border-black p-3 pt-1 m-0 `}>Bill</div>
      <div className={`h5 border-bottom border-1 border-black p-2 m-0 mb-1 d-flex justify-content-between`}>
        <p>Item</p>
        <p>Price</p>
      </div>
      <div>
        {itemList.map((item,index)=>{
          let itemPrice=((item.productId.price*100)/(100-(item.productId.discountPercentage))).toFixed(2)
          totalPrice += Number(itemPrice)
          return(
            <div key={index}>
              <div className={`d-flex justify-content-between p-2 fs-6`}>
                <div>{item.productId.title}</div>
                <div>{item.quantity} * ${itemPrice}</div>
              </div>
              <hr />
            </div>
          )
        })}
      </div>
      <div>
        <div className={`d-flex justify-content-between px-2 py-3 h5`}>
            <div>Total Price: </div>
            <div>${totalPrice}</div>
        </div>
        <hr />
        <div className={`d-flex justify-content-center p-2 pt-3`}>
          <button type="button" className="btn btn-warning px-3 py-1 fs-4 text-white">Place Order</button>
        </div>
      </div>
    </div>
  )
}

export default CartBill