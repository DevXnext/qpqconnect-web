"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import NavbarDark from '@/components/navbar/NavbarDark'
import SellerUtility from '../components/SellerUtility'
import { Footer } from '@/app/home/components/Footer'
import SellerProductCard from '../components/SellerProductCard'


export default function page() {
  return (
    <>
      <NavbarDark />
      <div className="sellerDetail flex xl:flex-row flex-col">
        <div className="leftContent xl:w-9/12 w-11/12 xl:ms-8 md:ms-10 ms-4 me-4">
        <div className="flex border shadow-lg rounded-xl px-4 py-4 mb-8 flex-col md:flex-row">
            <img src="/photo.png" alt="" className=' mb-4 me-4 lg:me-8 w-28 h-28'/>

            <div className='xl:me-20 me-8'>
            <h6 className=' font-bold mb-2'>NIDHI VISION INDIA PVT. LTD</h6>
            <div className='flex items-center mb-4'><img src="/images/Bagde (1).png" alt="" /><span className='ms-2'>Jharkhand, India</span></div>
            <button className='text-[#1A9882] border bg-[#E9FAF7] rounded-xl px-2 py-1 flex mb-8'>Active</button>
            </div>

            <div className='lg:me-20 w-40 me-8'>
                <h6 className='text-gray-500'>Member Since</h6>
                <h6>3 Years</h6>
                <h6 className='text-gray-500'>Rating</h6>
            </div>

            <div>
                <button className='border rounded h-9 px-4 py-2 w-11/12 mt-4'>Get Latest Price</button>
                <button className='border rounded h-9 px-4 py-2 w-11/12 my-4 bg-black text-white'>Contact Seller</button>
            </div>
        </div>

        
       <SellerUtility/>

        <div className="description mb-12">
            <h6 className='font-bold mb-4'>Description</h6>
            <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>

      
        </div>
        <div className='rightContent'>
          <div className="flex flex-col sm:flex-row xl:flex-col">
        <div className="rightSellerDetail w-72 border px-4 py-4 rounded-xl shadow-lg h-80 mb-8 mx-auto">
            <h6 className='font-bold mb-8'>Seller Details</h6>
    
            <div className="contact text-sm mt-4 ">
                <div className="flex items-center mb-2">
                    <img src="/images/Bagde.png" alt="" height={5} className='me-2'/>
                    <div>
                        <span className='text-gray-500'>Businesses Number</span> <br />
                        <span>2465465116464</span>
                    </div>
                </div>
                <div className="flex items-center mb-2">
                <img src="/images/Bagde (1).png" alt="" className='me-2'/>
                    <div>
                        <span className='text-gray-500'>Address</span> <br />
                        <span>Unity Park, Shop No.4, Narpatgiri Chowk, Near Hdfc Bank, Somwar Peth, Pune, Maharashtra, 411011, India</span>
                    </div>
                </div>
                <div className="flex items-center mb-2">
                <img src="/images/Bagde (2).png" alt="" className='me-2'/>
                    <div>
                        <span className='text-gray-500 '>Member Since</span> <br />
                        <span>3 Years</span>
                    </div>
                </div>
                <img src="/images/Rectangle 3.png" alt="" />
                </div>
            </div>

            <div className="enquiryToSupplier md:w-72 w-64 xl:mt-4 border py-8 rounded-xl  mx-auto">
            <h4 className='underline font-bold md:ms-2 mb-2'>Send your enquiry to the Supplier</h4>
            <h6 className='text-sm md:ms-2 font-bold mb-2 md:mb-8'>TO - NIDHI VISION INDIA PVT. LTD</h6>
            <form className='md:ms-4'>
                <label htmlFor="Name" className='ms-1'>Name</label><br />
                <input className='px-4 py-2 md:w-64 w-56 rounded-sm mb-4 border' type="text" name='Name' placeholder='Enter your name here' /><br />
                <label htmlFor="Mobile" className='ms-1'>Mobile Number</label><br />
                <input className='px-4 py-2 md:w-64 w-56 rounded-sm mb-4 border' type="number" name='Mobile' placeholder='+91 |' /><br />
                <label htmlFor="Name" className='ms-1'>Message</label><br />
                <input className='px-4 py-2 md:w-64 w-56 rounded-sm mb-4 border' type="text" name='Message' placeholder='Type your message here...' /><br />
                <Button className='md:w-64 w-56 mt-2'>Send Request &rarr;</Button>
            </form>
            </div>
            </div>
        </div>
        </div>
        <div className=' mt-20'>
        <h4 className='font-bold text-xl mb-8 mx-8 '>More Products from the Seller</h4>
        <div className="flex flex-col justify-center lg:justify-start items-center lg:flex-nowrap flex-wrap md:flex-row">

        {Array(4).fill(
          <SellerProductCard/>
        
        )}
        </div>
    </div>
        
      <Footer/>
    </>
  )
}
