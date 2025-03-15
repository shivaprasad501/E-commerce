import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewletterBox from '../components/NewletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl border-t pt-8 text-center'>
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className='flex flex-col md:flex-row gap-16 m-10'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt='' />
        <div className='flex flex-col justify-center  gap-6 md:w-2/3 text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, placeat! Minus repudiandae, non optio nihil facere quis, quam eaque dignissimos officiis libero atque nostrum et mollitia! Sit nisi quasi atque?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, placeat! Minus repudiandae, non optio nihil facere quis, quam eaque dignissimos officiis libero atque nostrum et mollitia! Sit nisi quasi atque?</p>
          <b className='text-gray-800'>OUR MISSION</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, inventore ex quaerat dicta soluta doloribus, harum nisi vitae corporis animi, totam temporibus nulla vel corrupti ratione sit. Quae, culpa quis!</p>
        </div>
      </div>
      <div className='text-4xl py-4'>
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance: </b>
          <p className='text-gray-600'> We meticulously select and vet each product to ensure it meets our stringent quality standards before offering it to you. </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Conveience: </b>
          <p className='text-gray-600'> We meticulously select and vet each product to ensure it meets our stringent quality standards before offering it to you. </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional customer service: </b>
          <p className='text-gray-600'> We meticulously select and vet each product to ensure it meets our stringent quality standards before offering it to you. </p>
        </div>
      </div>
      <NewletterBox />

    </div>
  )
}

export default About
