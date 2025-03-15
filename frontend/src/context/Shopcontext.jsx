import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
 export const Shopcontext=createContext()

const Shopcontextprovider = (props) => {
    const currency='$'
    const delivery_fee=10
    const backendUrl=import.meta.env.VITE_BACKEND_URL
  const[products,setproducts]=useState([])
  const[token,settoken]=useState('')

  const [Search,setSearch]=useState('')
  const [ShowSearch,setShowSearch]=useState(false)
  const[cartItems,setcartItems]=useState({})
  const navigate=useNavigate()

  const addtocart =async(itemId,size)=>{
    if(!size){
      toast.error("Select product size")
      return
    }

    
    let cartdata=structuredClone(cartItems)
    if(cartdata[itemId]){
      if(cartdata[itemId][size]){
        cartdata[itemId][size]+=1
      }
      else{
        cartdata[itemId][size]=1
      }
    }
    else{
      cartdata[itemId]={}
      cartdata[itemId][size]=1
    }
    setcartItems(cartdata)
   if(token){
    try {
      await axios.post(backendUrl+"/api/cart/add",{itemId,size},{headers:{token}})
    } catch (error) {
      console.log(error)
     toast.error(error.message)
      
    }
   }


  }
 const getcartcount=()=>{
   let totalcount=0
   for(const items in cartItems){
    for(const item in cartItems[items]){
      try {
        if(cartItems[items][item]>0){
          totalcount+=cartItems[items][item]
        }
      } catch (error) {
        console.log(error)
        console.log(error.message)
 
      }
    }
   }
   return totalcount
 }
 const updateQuantity=async(itemId,size,quantity)=>{
  let cartData=structuredClone(cartItems)
  cartData[itemId][size]=quantity
  setcartItems(cartData)
  if(token){
    try {
     await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }



 }
 const getCartAmount = () => {
  let totalAmount = 0;

  for (const items in cartItems) {
      let itemInfo = products.find(product => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
              totalAmount += itemInfo.price * cartItems[items][item];
          }
      } catch (error) {

      }

      }
  }

  return totalAmount;
};

const getProductsData=async()=>{
  try {
    const response=await axios.get(backendUrl+'/api/product/list')
    if(response.data.success){
      setproducts(response.data.products)
    }else{
      toast.error(response.data.msg)
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message)
    
  }

}
const getusercart=async(token)=>{
  try {
   const response= await axios.post(backendUrl+"/api/cart/get",{},{headers:{token}})
   if(response.data.success){
    setcartItems(response.data.cartData)

   }
    
  } catch (error) {
    console.log(error)
    toast.error(error.message)
    
  }
  
}





useEffect(()=>{
  getProductsData()
},[])
useEffect(()=>{
  if(!token && localStorage.getItem('token')){
    settoken(localStorage.getItem('token'));
    getusercart(localStorage.getItem('token'))
  }
},[])






    const value={
        products,currency,delivery_fee,
        Search,setSearch,ShowSearch,setShowSearch,
        addtocart,cartItems,getcartcount,updateQuantity,
        getCartAmount,navigate,backendUrl,token,settoken,setcartItems
    }
  return (
    <div>
        <Shopcontext.Provider value={value}>
            {props.children}
        </Shopcontext.Provider>
      
    </div>
  )
}

export default Shopcontextprovider
