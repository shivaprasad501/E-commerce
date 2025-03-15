import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import { assets } from '../assets/frontend_assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
    const { Search ,setSearch,ShowSearch,setShowSearch}=useContext(Shopcontext)
    const[visible,setvisible]=useState(false)
    const location=useLocation()
useEffect(()=>{
   if( location.pathname.includes("collection")){
    setvisible(true)
   }else{
    setvisible(false)
   }
},[location])


  return ShowSearch && visible ? (
    <div className='border-t  bg-gray-50 text-center'>
        <div className='inline-flex justify-center items-center border border-gray-500 px-5 py-2  my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input value={Search} onChange={(e)=>setSearch(e.target.value)} className=' outline-none bg-inherit text-sm  flex-1' type="text"  placeholder='Search'/>
        <img className='w-4' src={assets.search_icon} alt=''/>

        </div>
        <img onClick={()=>setShowSearch(false)} className='inline w-3 cursor-pointer' src={assets.cross_icon} alt=''/>
      
    </div>
  ):null
}

export default SearchBar
