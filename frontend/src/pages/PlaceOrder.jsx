import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { Shopcontext } from '../context/Shopcontext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method, setmethod] = useState("cod")
  const { navigate, backendUrl, token, cartItems, setcartItems, getCartAmount, products, delivery_fee } = useContext(Shopcontext)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onchangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData(data => ({ ...data, [name]: value }))

  }

  const initpay=(order)=>{
    const options={
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency:order.currency,
      name:'Order Payment',
      description:'Order Payment',
      order_id:order.id,
      receipt:order.receipt,
      handler:async(response)=>{
        console.log("Razorpay Response:", response);
        try {
          const {data}=await axios.post(backendUrl+"/api/order/verifyRazorpay",response,{headers:{token}})
          if(data.success){
            navigate('/orders')
            setcartItems({})
          }
        } catch (error) {
          console.log(error)
          toast.error(error)
          
        }
      }
    }
    const rzp= new window.Razorpay(options )
    rzp.open()

  }

  const OnSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const iteminfo = structuredClone(products.find(product => product._id === items))
            if (iteminfo) {
              iteminfo.size = item
              iteminfo.quantity = cartItems[items][item]
              orderItems.push(iteminfo)
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }
      switch (method) {
        //api call for cod
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          if (response.data.success) {
            setcartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break
          case 'razorpay':

          const responcerazorpay=await axios.post(backendUrl+"/api/order/razorpay",orderData,{headers:{token}})
          if(responcerazorpay.data.success){
            initpay(responcerazorpay.data.order)
          }





          break

      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={OnSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* ..............leftside................. */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onchangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type='text' placeholder='First name' />
          <input required onChange={onchangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type='text' placeholder='Last name' />
        </div>
        <input required onChange={onchangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type='text' placeholder='Email address' />
        <input required onChange={onchangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type='text' placeholder='Street' />
        <div className='flex gap-3'>
          <input required onChange={onchangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type='text' placeholder='City' />
          <input required onChange={onchangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type='text' placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onchangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type='number' placeholder='Zipcode' />
          <input required onChange={onchangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type='text' placeholder='Country' />
        </div>
        <input required onChange={onchangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type='number' placeholder='Phone' />
      </div>
      {/* ...........rightside.................. */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* .......Payment methods ...... */}
          <div className='flex flex-col gap-3 lg:flex-row text-gray-100'>
            <div onClick={() => setmethod('razorpay')} className='flex items-center gap-3 border cursor-pointer p-2 px-3'>
              <p className={`min-w-3.5 h-3.5 border rounded-full  ${method === "razorpay" ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setmethod('cod')} className='flex items-center gap-3 border cursor-pointer p-2 px-3'>
              <p className={`min-w-3.5 h-3.5 border rounded-full  ${method === "cod" ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 font-medium mx-4 text-sm'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit ' className='bg-black text-white text-sm px-16 py-3 cursor-pointer'>PLACE ORDER</button>

          </div>

        </div>

      </div>

    </form>
  )
}

export default PlaceOrder
