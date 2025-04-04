import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(Shopcontext)
  const [CartData, setCartData] = useState([])
  useEffect(() => {

    if(products.length>0){
      let tempdata = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempdata.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempdata)
    }
  }, [cartItems,products])
  return (
    <div className='border-t pt-14 '>
      <div className='text-2xl mb-3'>
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {
          CartData.map((item, index) => {
            const productdata = products.find((product) => product._id === item._id)
            return (
              <div key={index} className='border-t border-b py-4 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={productdata.image[0]} alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productdata.name}</p>
                    <div className='flex items-center mt-2 gap-5'>
                      <p>{currency}{productdata.price}</p>
                      <p className='border bg-slate-50 px-2 sm:px-3 sm:py-1'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='border  max-w-10 sm:max-w-20 p-1 sm:px-2' type='number' min={1} defaultValue={item.quantity}></input>
                <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} />

              </div>
            )
          })
        }

      </div>
      <div className=' flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={() => navigate("/place-order")} className='bg-black text-white text-sm px-8 py-3 my-8 cursor-pointer'>Proccced to checkout</button>

          </div>
        </div>


      </div>

    </div>
  )
}

export default Cart
