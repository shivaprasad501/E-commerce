import React from 'react'
import Title from './Title'
import { Shopcontext } from '../context/Shopcontext'
import { useContext } from 'react'

const CartTotal = () => {
    const {currency,delivery_fee,getCartAmount}=useContext(Shopcontext)
  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={"CART"} text2={"TOTALS"}/>
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>Subtotal</p>
                <p>{currency}{getCartAmount()}.00</p>
            </div>
            <hr/>
            <div className='flex justify-between'>
                <p>Shipping fee</p>
                <p>{currency}{delivery_fee}.00</p>
            </div>
            <hr/>
            <div className='flex justify-between'>
                <p>Total</p>
                <p>{currency}{getCartAmount()===0 ? 0 :getCartAmount()+delivery_fee}.00</p>
            </div>

        </div>
      
    </div>
  )
}

export default CartTotal
