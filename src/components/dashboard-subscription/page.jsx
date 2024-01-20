import Image from 'next/image'
import React from 'react'

const DashboardSubscription = () => {
  return (
   <>
   <div className='w-full flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 bg-white'>
    <div className=' flex-col rounded-md shadow flex space-y-5 p-2 lg:basis-1/4 w-full lg:w-auto'>
        <div className='space-y-2 h-28 justify-center flex flex-col'>
        <div className='flex-row flex justify-between items-center'>
<p className='font-bold text-xl'>Compare plans</p>
<div className='border p-2 rounded-full shadow'><p>40% OFF</p></div>
        </div>
        <p className='font-medium text-gray-500 text-sm'>Choose your workspace plan according to your organisational plan</p>
        </div>
  <div className='border-y-[1px] py-2 px-3 flex  items-center h-16 font-semibold text-gray-800 '>
<p>Number of Products</p>
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16 flex  items-center font-semibold text-gray-800 '>
<p>Users Per Page</p>
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16 flex  items-center font-semibold text-gray-800 '>
<p>Includes essential features to get started</p>
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16 flex  items-center font-semibold text-gray-800 '>
<p>More advanced features for increased productivity</p>
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16 flex  items-center font-semibold text-gray-800 '>
<p>Designing & Development</p>
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16 flex  items-center font-semibold text-gray-800 '>
<p>Customizable options to meet your specific needs</p>
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16 flex  items-center font-semibold text-gray-800 '>
<p>Email Support</p>
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16 flex  items-center font-semibold text-gray-800 '>
<p>24/7 customer support</p>
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16 flex  items-center font-semibold text-gray-800 '>
<p>Analytics and reporting</p>
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16 flex  items-center font-semibold text-gray-800 '>
<p>Account Management</p>
  </div>
    </div>
   
    <div className='flex-col rounded-md shadow-xl shadow-gray-500 flex space-y-5 p-2 lg:basis-1/4 w-full lg:w-auto'>
        <div className='space-y-2 h-28 justify-center flex flex-col'>
        <div className='flex-row flex justify-center space-x-2 items-center'>
<p className='font-bold text-xl'>Free</p> <p className='text-gray-400'> / Lifetime</p>

        </div>
       <button className='bg-black p-3 rounded-md text-white'>Current Plan</button>
        </div>
  <div className='border-y-[1px] py-2 px-3 h-16  flex  items-center   justify-center  flex-colfont-semibold text-center text-gray-800 '>
<p>20 Products</p>
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16 flex  items-center   justify-center  flex-col  font-semibold text-center text-gray-800 '>
<p>5 Pages</p>
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16   font-semibold flex  items-center   justify-center  flex-col text-gray-800 '>
<Image src="/icon/check-star.svg" width={25} height={25} alt='start' />
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16   font-semibol flex  items-center   justify-center  flex-col text-gray-800 '>
<Image src="/icon/check-star.svg" width={25} height={25} alt='start' />
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16 flex  items-center  font-semibold '>

  </div>
  <div className='border-y-[1px] py-2 px-3 h-16 flex  items-center  font-semibold '>

  </div>
  <div className='border-y-[1px] py-2 px-3 h-16 flex  items-center  font-semibold  '>

  </div>
  <div className='border-y-[1px] py-2 px-3 font-semibold  h-16 flex  items-center '>

  </div>
  <div className='border-y-[1px] py-2 px-3 font-semibold h-16 flex  items-center '>

  </div>
  <div className='border-y-[1px] py-2 px-3 font-semibold h-16 flex  items-center   justify-center flex-col text-gray-800 '>
<Image src="/icon/check-star.svg" width={25} height={25} alt='start' />
  </div>
    </div>
    <div className=' flex-col rounded-md shadow hover:shadow-xl hover:shadow-gray-500 flex space-y-5 p-2 basis-1/4'>
        <div className='space-y-2 h-28 justify-center flex flex-col'>
        <div className='flex-row flex justify-center space-x-2 items-center'>
<p className='font-bold text-xl'>$199</p> <p className='text-gray-400'> / Month</p>

        </div>
       <button className='bg-black p-3 rounded-md text-white'>Upgrade to pro</button>
        </div>
  <div className='border-y-[1px] py-2 px-3 h-16 flex  items-center   justify-center  flex-col font-semibold text-center text-gray-800 '>
<p>600 Products</p> <p className='text-gray-400'>Pages Add-ons on Demand</p>
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16 flex  items-center   justify-center  flex-col  font-semibold text-center text-gray-800 '>
<p>50 Pages</p>
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16   font-semibold flex  items-center   justify-center  flex-col text-gray-800 '>
<Image src="/icon/check-star.svg" width={25} height={25} alt='start' />
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16   font-semibol flex  items-center   justify-center  flex-col text-gray-800 '>
<Image src="/icon/check-star.svg" width={25} height={25} alt='start' />
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16   font-semibold flex  items-center   justify-center  flex-col text-gray-800 '>
<Image src="/icon/check-star.svg" width={25} height={25} alt='start' />
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16   font-semibold flex  items-center   justify-center  flex-col text-gray-800 '>
<Image src="/icon/check-star.svg" width={25} height={25} alt='start' />
  </div>      
  <div className='border-y-[1px] py-2 px-3 h-16   font-semibold flex  items-center   justify-center  flex-col text-gray-800 '>
<Image src="/icon/check-star.svg" width={25} height={25} alt='start' />
  </div>
  <div className='border-y-[1px] py-2 px-3 font-semibold  h-16 flex  items-center '>
 
  </div>
  <div className='border-y-[1px] py-2 px-3 font-semibold h-16 flex  items-center '>

  </div>
  <div className='border-y-[1px] py-2 px-3 font-semibold h-16 flex  items-center   justify-center flex-col text-gray-800 '>
<Image src="/icon/check-star.svg" width={25} height={25} alt='start' />
  </div>
    </div>
    <div className='flex-col rounded-md shadow hover:shadow-xl hover:shadow-gray-500 flex space-y-5 p-2 lg:basis-1/4 w-full lg:w-auto'>
        <div className='space-y-2 h-28 justify-center flex flex-col'>
        <div className='flex-row flex justify-center space-x-2 items-center'>
<p className='font-bold text-xl'>$299</p> <p className='text-gray-400'> / Month</p>

        </div>
       <button className='bg-black p-3 rounded-md text-white'>Upgrade to plus</button>
        </div>
  <div className='border-y-[1px] py-2 px-3 h-16 flex  items-center   justify-center  flex-col font-semibold text-center text-gray-800 '>
<p>Unlimited Pages</p> <p className='text-gray-400'>Pages Add-ons on Demand</p>
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16 flex  items-center   justify-center  flex-col  font-semibold text-center text-gray-800 '>
<p>Unlimited Pages</p>
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16   font-semibold flex  items-center   justify-center  flex-col text-gray-800 '>
<Image src="/icon/check-star.svg" width={25} height={25} alt='start' />
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16   font-semibold flex  items-center   justify-center  flex-col text-gray-800 '>
<Image src="/icon/check-star.svg" width={25} height={25} alt='start' />
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16   font-semibold flex  items-center   justify-center  flex-col text-gray-800 '>
<Image src="/icon/check-star.svg" width={25} height={25} alt='start' />
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16   font-semibold flex  items-center   justify-center  flex-col text-gray-800 '>
<Image src="/icon/check-star.svg" width={25} height={25} alt='start' />
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16   font-semibold flex  items-center   justify-center  flex-col text-gray-800 '>
<Image src="/icon/check-star.svg" width={25} height={25} alt='start' />
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16   font-semibold flex  items-center   justify-center  flex-col text-gray-800 '>
<Image src="/icon/check-star.svg" width={25} height={25} alt='start' />
  </div>
  <div className='border-y-[1px] py-2 px-3 h-16   font-semibold flex  items-center   justify-center  flex-col text-gray-800 '>
<Image src="/icon/check-star.svg" width={25} height={25} alt='start' />
  </div>
  <div className='border-y-[1px] py-2 px-3 font-semibold h-16 flex  items-center   justify-center flex-col text-gray-800 '>
<Image src="/icon/check-star.svg" width={25} height={25} alt='start' />
  </div>
    </div>
   </div>
   </>
  )
}

export default DashboardSubscription