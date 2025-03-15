import React, { useState } from 'react'
import axios from "axios"
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({settoken}) => {

  const [email,setemail]=useState('')
  const[password,setpassword]=useState('')

  const onSubmitHandler =async(e)=>{
    try {
        e.preventDefault()
       const response=await axios.post (backendUrl+'/api/user/admin',{email,password} )
       if(response.data.success){
        settoken(response.data.token)
       }else{
         toast.error(response.data.msg)
       }

    } catch (error) {
      console.error(error);
      toast.error(error.message)
    
    }
  }


  return (
    <div className='flex justify-center items-center min-h-screen w-full'>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2xl mb-4 font-bold'>Admin panel</h1>
            <form onSubmit={onSubmitHandler}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                    <input onChange={(e)=>setemail(e.target.value)} value={email} className='rounded-md w-full border  px-3 py-2 border-gray-300  outline-none' type='email' placeholder='Enter your email' required/>
                </div>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password </p>
                    <input onChange={(e)=>setpassword(e.target.value)} value={password}  className='rounded-md w-full border  px-3 py-2 border-gray-300  outline-none' type='password' placeholder='Enter your password' required/>
                  
                </div>
                <button className='mt-2 w-full  py-2 px-4 rounded-md text-white bg-black' type='submit'>Login</button> 
            </form>
        </div>
      
    </div>
  )
}

export default Login
