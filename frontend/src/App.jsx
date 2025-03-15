
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Cart from "./pages/Cart"
import Contact from "./pages/Contact"
import Orders from "./pages/orders"
import PlaceOrder from "./pages/PlaceOrder"
import Product from "./pages/Product"
import Login from "./pages/Login"
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';


const App = () => {
  return (
    <div className='px-5 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] '>
      <ToastContainer/>
      <NavBar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/about' element={<About/>}  />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/place-order'element={<PlaceOrder/>} />
        <Route path='/product/:ProductId' element={<Product/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
      <Footer/>
      
    </div>
  )
}

export default App
