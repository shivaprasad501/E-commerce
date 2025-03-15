import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import Title from './Title'
import Productitem from './Productitem'

const RelatedProducts = ({category,subcategory}) => {
    const {products}=useContext(Shopcontext)
    const[Related,setRelated]=useState([])
    useEffect(()=>{
        if(products.length>0){
            let productcopy=products.slice()
            productcopy=productcopy.filter((item)=> category===item.category)
             productcopy=productcopy.filter((item)=> subcategory===item.subcategory)
            setRelated(productcopy.slice(0,5))
        }
    },[products])
  return (
  <div className='my-24'>
    <div className='text-3xl text-center py-2'>
        <Title text1={"RELATED"} text2={"PRODUCTS"}/>
    </div>
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
         {
            Related.map((item,index)=>(
                <Productitem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
            ))
         }

    </div>

  </div>

   
  )
}

export default RelatedProducts
{/* <div >
        
{
 Related.map((item,index)=>(
      <img  key={index} src={item.image} alt="" />
  )  
)
}

</div> */}