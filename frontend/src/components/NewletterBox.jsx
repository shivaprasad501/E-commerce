import React from 'react'

const NewletterBox = () => {
    function onsumbmitHandler(event){
       event.preventDefault() 
    }
  return (
    <div className='text-center my-30'>
        <p className='font-medium text-gray-800 text-2xl'>Subscribe now and get 20% off</p>
        <p className='mt-3 text-gray-400'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum itaque corporis impedit,</p>
        <form onSubmit={onsumbmitHandler} className='w-full sm:w-1/2 flex items-center m-auto my-6 gap-3 border pl-3 '>
            <input className=' w-full sm:flex-1 outline-none' type="email"placeholder='Enter your email' required />
            <button className='bg-black text-white text-sm py-4 px-10' type='submit'>SUBSCRIBE</button>
        </form>
      
    </div>
  )
}

export default NewletterBox
