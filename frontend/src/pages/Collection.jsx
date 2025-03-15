import React, { use, useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../components/Title'
import Productitem from '../components/Productitem'

const Collection = () => {
  const { products, ShowSearch, Search } = useContext(Shopcontext)
  const [showfilter, setshowfilter] = useState(false)
  const [filterProduct, setfilterProduct] = useState([])
  const [category, setcategory] = useState([])
  const [subcategory, setsubcategory] = useState([])
  const [SortType, setSortType] = useState("relevent")



  const togglecategory = (e) => {
    if (category.includes(e.target.value)) {

      setcategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setcategory(prev => [...prev, e.target.value])
    }

  }
  const togglesubcategory = (e) => {
    if (subcategory.includes(e.target.value)) {

      setsubcategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setsubcategory(prev => [...prev, e.target.value])
    }

  }
  const applyfilter = () => {
    let productcopy = products.slice()

    if (Search && ShowSearch) {
      productcopy = productcopy.filter(item => item.name.toLowerCase().includes(Search.toLowerCase()))
    }

    if (category.length > 0) {
      productcopy = productcopy.filter(item => category.includes(item.category))
    }
    if (subcategory.length > 0) {
      productcopy = productcopy.filter(item => subcategory.includes(item.subcategory))
    }
    setfilterProduct(productcopy)
  }
  const sortProducts = () => {
    const fpcopy = filterProduct.slice()
    switch (SortType) {
      case "low-high":
        setfilterProduct(fpcopy.sort((a, b) => (a.price - b.price)))
        break;
      case "high-low":
        setfilterProduct(fpcopy.sort((a, b) => (b.price - a.price)))
        break;
      default:
        applyfilter()
        break;
    }

  }
  useEffect(() => {
    applyfilter()
  }, [category, subcategory, Search, ShowSearch,products])
  useEffect(() => {
    sortProducts()
  }, [SortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t mb-30 '>
      {/* filter */}
      <div className='min-w-60'>
        <p onClick={() => setshowfilter(!showfilter)} className='my-2 flex items-center gap-2 cursor-pointer text-xl'>FILTER
          <img className={`h-3 sm:hidden ${showfilter ? "rotate-90" : ""} `} src={assets.dropdown_icon} alt='' />
        </p>
        {/* category filter  */}
        <div className={` border border-gray-300 pl-5 py-3  mt-6 sm:block  ${showfilter ? "" : "hidden"}`}>
          <p className='text-sm font-medium mb-3'>CATEGORIES</p>
          <div className='felx flex-col text-sm font-light text-gray-700 gap-2 '>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={"Men"} onChange={togglecategory} />Men

            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={"Women"} onChange={togglecategory} />Women

            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={"Kids"} onChange={togglecategory} />Kids
            </p>
          </div>
        </div>
        {/* subcategory filter */}
        <div className={` border border-gray-300 pl-5 py-3  my-5 sm:block  ${showfilter ? "" : "hidden"}`}>
          <p className='text-sm font-medium mb-3'>TYPE</p>
          <div className='felx flex-col text-sm font-light text-gray-700 gap-2 '>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={"Topwear"} onChange={togglesubcategory} />Topwear

            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={"Bottomwear"} onChange={togglesubcategory} />Bottomwear

            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={"Winterwear"} onChange={togglesubcategory} />Winterwear
            </p>
          </div>
        </div>

      </div>
      {/* rightside */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl  mb-4'>
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by :Relavent</option>
            <option value="low-high">Sort by :low-high</option>
            <option value="high-low">Sort by : high-low</option>
          </select>
        </div>
        {/* Map products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProduct.map((item, index) => (
              <Productitem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))
          }

        </div>

      </div>

    </div>
  )
}

export default Collection
