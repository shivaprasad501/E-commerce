import React, { useContext, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { Shopcontext } from '../context/Shopcontext'

const NavBar = () => {
    const[visible ,setvisible]=useState(false)
    const {setShowSearch,getcartcount,navigate,token,settoken,setcartItems }=useContext(Shopcontext)
 const logout=()=>{
  localStorage.removeItem('token')
  settoken('')
  setcartItems({})
  navigate('/login ')
 }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to={"/"}>
      <img src={assets.logo} className='w-36' alt=''/>
      </Link>
     
      <ul className=' hidden sm:flex gap-5 text-sm text-gray-700 items-center'>
        <NavLink to={"/"} className='flex flex-col items-center gap-1'>
            <p>HOME</p>
            <hr className='w-2/4  border-none h-[1.5px] bg-gray-700  hidden'></hr>

        </NavLink>
        <NavLink to={"/collection"} className='flex flex-col items-center gap-1'>
            <p>COLLECTION</p>
            <hr className='w-2/4  border-none h-[1.5px] bg-gray-700 hidden '></hr>

        </NavLink>
        <NavLink to={"/about"} className='flex flex-col items-center gap-1'>
            <p>ABOUT</p>
            <hr className='w-2/4  border-none h-[1.5px] bg-gray-700 hidden'></hr>

        </NavLink>
        <NavLink to={"/contact"} className='flex flex-col items-center gap-1'>
            <p>CONTACT</p>
            <hr className='w-2/4  border-none h-[1.5px] bg-gray-700 hidden'></hr>

        </NavLink>
        <a className='flex flex-col items-center gap-1 border rounded-full px-4 py-2 bg-gray-100' href="https://admin-omega-three.vercel.app/list" target="_blank" rel="noopener noreferrer">Admin Panel</a>
      </ul>
            <div className='flex items-center gap-6'> 
            <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt=''/>
            <div className='group relative'>
              <img onClick={()=>token ?null:navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer' alt=''/>
              {/* Dropdown menu */}
              {token && <div className=' group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
               <div className='flex flex-col gap-2 w-36 px-5 py-3 bg-slate-100 text-gray-500 rounded'>
                <p  onClick={()=>navigate('/orders')}   className='cursor-pointer hover:text-black'> Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-black'> Logout</p>
               </div>
            </div>}
            
        </div>
        <Link to={"/cart"} className='relative'>
        <img src={assets.cart_icon} className='w-5 cursor-pointer' alt=''/>
        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full  text-[8px]'>
            {getcartcount()}
        </p>
        </Link>
        <img onClick={()=>setvisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt=''/>
      </div>
      {/* sidebar */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden  bg-white transition-all ${visible ? 'w-full ':'w-0'}`}>
      <div className=' flex flex-col text-gray-600'>
        <div onClick={()=>setvisible(false)} className=' flex items-center gap-4 p-3 cursor-pointer'>
            <img  src={assets.dropdown_icon} className='h-4 rotate-180' alt=''/>
            <p>Back</p>
        </div>
        <NavLink onClick={()=>setvisible(false)}  className="py-2 pl-6 border" to={"/"}>HOME</NavLink>
        <NavLink onClick={()=>setvisible(false)}  className="py-2 pl-6 border-b" to={"/collection"}>COLLECTION</NavLink>
        <NavLink onClick={()=>setvisible(false)}  className="py-2 pl-6 border-b" to={"/about"}>ABOUT</NavLink>
        <NavLink onClick={()=>setvisible(false)}  className="py-2 pl-6 border-b" to={"/contact"}>CONTACT</NavLink>
        <a className="py-2 pl-6 border-b"  href="https://admin-omega-three.vercel.app/list" target="_blank" rel="noopener noreferrer">Admin Panel</a>


      </div>
      </div>
    </div>
  )
}

export default NavBar
