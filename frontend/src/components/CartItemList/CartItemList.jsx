import React from 'react'
import CartItem from '../CartItem/CartItem'

function CartItemList({itemList}) {
  return (
    <>
      <div className={`d-flex flex-column gap-3`}>
        {itemList.map((item,index)=>{
          return <CartItem item={item} key={index}/>
        })}
      </div>
    </>
  )
}

export default CartItemList