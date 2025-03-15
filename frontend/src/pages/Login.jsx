import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const[currentState,setcurrentState]=useState('Login')
  const{token,settoken,navigate,backendUrl}=useContext(Shopcontext)
  const[name,setname]=useState('')
  const[email,setemail]=useState('')
  const[password,setpassword]=useState('')
  const OnSubmitHandler=async(e)=>{
    e.preventDefault()
    try {
      if(currentState==='Sign Up'){
        const response=await axios.post(backendUrl+"/api/user/register",{name,password,email})
        if(response.data.success){
          settoken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }else{
          toast.error(response.data.msg)
        }
      }else{
        const response=await axios.post(backendUrl+"/api/user/login",{email,password})

        if(response.data.success){
          settoken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }else{
          toast.error(response.data.msg)
        }

      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
 
  }
  
useEffect(()=>{
  if(token){
    navigate('/')
  }

},[token])




  return (
      <form onSubmit={OnSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
        <div className='inline-flex items-center  gap-2 mb-2 mt-10'>
          <p className='prata-regular text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
        </div>
        {currentState==='Login'? "":<input onChange={(e)=>setname(e.target.value)} value={name} placeholder='Name' type='text' className='w-full px-3 py-2 border border-gray-800' required/>}
        <input onChange={(e)=>setemail(e.target.value)} value={email}  placeholder='Email' type='email' className='w-full px-3 py-2 border border-gray-800' required/>
        <input onChange={(e)=>setpassword(e.target.value)} value={password}  placeholder='Password' type='password' className='w-full px-3 py-2 border border-gray-800' required/>
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='cursor-pointer'> Forgot your password?</p>
          {
            currentState==='Login'
            ?<p onClick={()=>setcurrentState("Sign Up")} className='cursor-pointer'>Create Account</p>
            :<p  onClick={()=>setcurrentState('Login')} className='cursor-pointer'>Login Here</p>
          }
        </div>
        <button  className='bg-black text-white  font-light text-sm px-8 py-2 mt-4 cursor-pointer'>{currentState==='Login'?'Sign in': 'Sign up'}</button>
      </form>
  )
}

export default Login
