import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, curreny } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {
  const[list,setList]=useState([])

  const fetchList =async()=>{
    try {
      const response=await axios.get(backendUrl+'/api/product/list')
      if(response.data.success){
        setList(response.data.products);
      }else{
        toast.error(response.data.msg)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)  
    }
  }
  const removeproduct=async(id)=>{
    try {
      const response=await axios.put(backendUrl+"/api/product/remove",{id},{headers:{token}})
      if(response.data.success){
        toast.success(response.data.msg);
        await fetchList()
      }else{
        toast.error(response.data.msg)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)  
      
    }

  }







  useEffect(()=>{
    fetchList()
  },[])
  return (
    <div>
      <p className='mb-2'>All Products List</p>
      {/* ..........list table titles............... */}
      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm  border-gray-200 '>
        <b>Image</b>
        <b>Name</b>
        <b>category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
      </div>
       {/* ..........products list............... */}
       {
        list.map((item,index)=>(
          <div className='grid  grid-cols-1   sm:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2  border text-sm mt-2 border-gray-200' key={index}>
              <img  className='w-12' src={item.image[0]} alt=''/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{curreny}{item.price}</p>
              <p onClick={()=>removeproduct(item._id)}  className="text-right md:text-center cursor-pointer text-lg text-gray-500 hover:text-gray-900">X</p>
          </div>
        
        ))
       }
      
    </div>
  )
}

export default List
