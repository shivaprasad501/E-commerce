import React from 'react'
import Hero from '../components/Hero'
import Latestcollections from '../components/latestcollections'
import Bestseller from '../components/Bestseller'
import Ourpolicy from '../components/Ourpolicy'
import NewletterBox from '../components/NewletterBox'

const Home = () => {
  return (
    <div >
      <Hero/>
     <Latestcollections/>
     <Bestseller/>
     <Ourpolicy/>
     <NewletterBox/>
      
    </div>
  )
}

export default Home
