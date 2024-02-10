import React from 'react'
import { Button } from '@/components/ui/button'

export default function SellerProductCard() {
  return (
    <>
        <div className="card rounded-2xl shadow-lg xl:w-96 lg:w-56 md:w-72 py-2 mb-4 px-4 xl:me-8 lg:me-4 lg:mx-8 mx-2">
            <img src={'/product_image.png'} alt="" width={200} className='mb-4 mx-auto'/>
            <h5 className='font-bold lg:text-sm xl:text-md mb-2'>Apple Airpods Pro MWP22A M/A Bluetooth 7.1 </h5>
            <p className='text-xs mb-2 text-[#8B8B8B]'>Min Quantity : 150</p>
            <div className='flex items-center mb-2'>
            <h6 className='font-bold me-2 '>$120.23 </h6>
            <p className='text-xs text-[#8B8B8B] line-through'>$11.23</p>
            </div>
            <p className='text-xs text-[#8B8B8B] mb-4'>Seller name</p>
            <Button className='mb-4'>Send Inquiry</Button>
    </div>
    </>
  )
}
