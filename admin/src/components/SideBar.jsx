import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/admin_assets/assets'


const SideBar = () => {
    return (
        <div className='w-[18%]  min-h-screen border-r-2'>
            <div className='flex flex-col gap-5 pt-6 pl-[20%] text-[15px]'>
                <NavLink className='flex border border-gray-300 border-r-0 gap-3 items-center px-3 py-2 rounded-l-lg' to={'/add'}>
                    <img className='w-5 h-5 ' src={assets.add_icon} alt='' />
                    <p className='hidden md:block'>Add Items</p>

                </NavLink>
                <NavLink className='flex border border-gray-300 border-r-0 gap-3 items-center px-3 py-2 rounded-l-lg' to={'/list'}>
                    <img className='w-5 h-5 ' src={assets.order_icon} alt='' />
                    <p className='hidden md:block'>List Items</p>

                </NavLink>
                <NavLink className='flex border border-gray-300 border-r-0 gap-3 items-center px-3 py-2 rounded-l-lg' to={'/orders'}>
                    <img className='w-5 h-5 ' src={assets.order_icon} alt='' />
                    <p className='hidden md:block'>Orders</p>

                </NavLink>
            </div>
        </div>

    )
}

export default SideBar
