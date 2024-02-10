import { Input } from '@/components/ui/input'
import React from 'react'
import HomeNavbar from './HomeNavbar'

export default function Hero() {
  return (
    <>
      <div className=" rounded-b-[60px] h-full w-full bg-cover bg-[url(https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&dpr=1)]">
        <div className="rounded-b-[60px] backdrop-brightness-50 w-full h-full">
       <HomeNavbar/>
        <div className='py-36'>
        <h2 className='text-white text-3xl md:text-5xl mx-auto mb-4 text-center font-bold leading-tight'>The leading B2B <br /> platform for global trade</h2>
        <h5 className='text-white  md:text-xl mx-auto text-center mb-8'>Search for products & find verified sellers near you</h5>
        <div className="flex justify-center items-center ms-28">
        <input placeholder="Search product or service name" className='w-[500px] px-4 py-3  text-white rounded-3xl bg-[#000000b1] border-none outline-none'/>
        <button className='bg-white rounded-3xl px-7 py-2 z-10 relative right-28 '>Search</button>
        </div>
        </div>
      </div>
      </div>
    </>
  )
}
