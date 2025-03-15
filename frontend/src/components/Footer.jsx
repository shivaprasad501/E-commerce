import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
    <div className='flex flex-col  sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-50 text-sm'>
      <div>
        <img className='w-32 mb-5' src={assets.logo}/>
        <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae at fugiat repudiandae sint unde consectetur veritatis praesentium labore porro, commodi excepturi ad repellendus architecto suscipit expedita distinctio quis velit officiis.</p>
      </div>
      <div>
        <p className='text-xl font-medium mb-5'>COMPANY</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
          <li>Home</li>
          <li>About usS</li>
          <li>Delivery</li>
          <li>Privacy policy</li>
        </ul>
      </div>
      <div>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
          <li>+91 1234567890</li>
          <li>contact@forveryou.com</li>
          
        </ul>
      </div>
    </div>
    <div>
    <hr></hr>
    <p className='py-5 text-center text-sm'> Copyright 2025@ forever.com - All rights reserved.</p>
  </div>
  </div>
  )
}

export default Footer
