import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import Title from './Title'
import Productitem from './Productitem'

const Latestcollections = () => {
  const {products}=useContext(Shopcontext)
  const [latestproducts,setlatestproducts]=useState([])
useEffect(()=>{
  setlatestproducts(products.slice(0,10))

},[products])

  return (
    <div className='my-10 '>
      <div className='py-8 text-center text-3xl'>
      <Title text1={"LATEST"}  text2={"COLLECTIONS"}/>
      <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium aperiam assumenda est quibusdam provident optio. 
      </p>
      </div>
      {/* {rendering products} */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 '>
        {
          latestproducts.map((item,index)=>(
            <Productitem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
          ))
        }

      </div>
      
    </div>
  )
}

export default Latestcollections
