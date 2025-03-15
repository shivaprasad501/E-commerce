import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Shopcontext } from '../context/Shopcontext'
import { assets } from '../assets/frontend_assets/assets'
import RelatedProducts from '../components/RelatedProducts'


const Product = () => {
  const {ProductId}=useParams()
  const{products ,currency,addtocart}=useContext(Shopcontext)
  const[productData,setproductData]=useState(false)
  const[image,setimage]=useState('')
  const[size,setsize]=useState('')
 const fetchProductData =async()=>{
  products.map((item)=>{
    if(item._id===ProductId){
      setproductData(item)
      setimage(item.image[0])
      return null
    }

  })

 }
 useEffect(()=>{
 fetchProductData()
 },[products,ProductId])


  return productData? (
    <div className='border-t-2  pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data */}
      <div className='flex gap-12 sm:gap-12 flex-col  sm:flex-row '>
      {/* product images */}
      <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
        <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18.7%] w-full'>
          {productData.image.map((item ,index)=>(
            <img onClick={()=>setimage(item)} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' src={item} key={index} alt=''/>
          ))}
        </div>
        <div className='w-full sm:w-[80%]'>
          <img  className='w-full h-auto' src={image} alt=''/>
        </div>
        </div>
        {/* product info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img className='w-3.5' src={assets.star_icon} alt=''/>
            <img className='w-3.5' src={assets.star_icon} alt=''/>
            <img className='w-3.5' src={assets.star_icon} alt=''/>
            <img className='w-3.5' src={assets.star_icon} alt=''/>
            <img className='w-3.5' src={assets.star_dull_icon} alt=''/>
            <p className='pl-2'>(112)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='md:w-4/5 mt-5 text-gray-500'>{productData.description}</p>
          <div className='flex flex-col gap-4 py-8'>
          <p>Select Size</p>
          <div className='flex gap-2'>
            {
              productData.sizes.map((item,index)=>(
                <button onClick={()=> setsize(item)} className={ `border border-gray-100 px-4 py-2 bg-gray-100 ${item===size ? 'border-orange-500':''}`} key={index}>{item}</button>
              ))
            }

          </div>
          </div>
          <button onClick={()=>(addtocart(productData._id,size))} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART </button>
          <hr className='mt-8 sm:w-4/5 '/>
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* description & reviews */}
      <div className='mt-20'>
            <div className='flex'>
              <b className='border px-5 py-3 text-sm'>Description</b>
              <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
            </div>
            <div className='flex flex-col p-6 gap-4 border text-sm text-gray-500'>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga quam eveniet modi obcaecati enim numquam, quasi error laudantium natus neque esse animi temporibus nostrum illo dicta rerum corporis quibusdam laboriosam.</p>
            <p> Tempore blanditiis rem, pariatur incidunt nam quas asperiores enim atque veritatis, delectus perferendis sed dolores ipsam molestias distinctio labore non dignissimos nesciunt dolor repudiandae quam velit et cupiditate. Natus, dolorem.</p>
            </div>
      </div>
      {/* ................display related  products ............ */}
      <div>
        <RelatedProducts category={productData.category} subcategory={productData.subcategory}/>
      </div>

    </div>
  
  ):<div className='opacity-0'></div>
}

export default Product
