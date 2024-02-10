import FilterSidenav from './FilterSidenav'
import NavbarDark from '@/components/navbar/NavbarDark'
import ProductList from './ProductList'
import React from 'react'
import { Footer } from '@/app/home/components/Footer'

export default function Steel() {
  return (
    <>
      <NavbarDark/>
      <div className="flex container items-baseline">
       <h5 className='font-bold mb-8 text-xl me-2'>Steel & Stainless Steel Products & Components</h5>
       <h6>(100565 products)</h6>
      </div>

      <div className="content flex flex-col md:flex-row md:container ">
        <div>
        <div className="relatedCategories border px-4 py-4 rounded-lg w-72 mx-auto md:w-60 h-screen mb-8 ">
            <h5 className='font-bold'>Related Categories</h5>
            {Array(7).fill(
                <div className='categoryCard border rounded-lg md:w-52 w-64 my-4 px-4 py-2 flex'>
                    <img src="/headphones.png" alt="none" width={45} className='me-2' />
                    <h6>Smart Phones & Tablets</h6>
                </div>
            )}
        </div>
        <div className="relatedBrands border px-4 py-4 rounded-lg w-72 mx-auto md:w-60  mb-8 ">
            <h5 className='font-bold'>Related Brands</h5>
            {Array(7).fill(
                <div className='categoryCard border rounded-lg md:w-52 w-64 my-4 px-4 py-2 flex'>
                    <img src="/hook.png" alt="" width={25} className='me-4'/>
                    <h6>RV Sellers</h6>
                </div>
            )}
        </div>
        <FilterSidenav/>
        </div>

        
        <div className="xl:ms-20 lg:ms-16 md:ms-12">
        <div className="rightCategory rounded-lg shadow-lg px-8 py-4 mb-12 xl:w-full mx-auto md:mx-0 w-11/12 ">
            <h5 className='font-bold mb-4'>Top Steel & Stainless Steel Products & Components Categories</h5>
            <div className="flex justify-between">
            <div className='w-24 text-center'>
            <img src="/industry-40.png" alt="" width={55} className='mx-auto'/>
            <span className='text-xs text-gray-500'>Industrial Equipment & ...</span>
            </div>
            <div className='w-24 text-center'>
            <img src="/industry-40.png" alt="" width={55} className='mx-auto'/>
            <span className='text-xs text-gray-500'>Industrial Equipment & ...</span>
            </div>
            <div className='w-24 text-center'>
            <img src="/industry-40.png" alt="" width={55} className='mx-auto'/>
            <span className='text-xs text-gray-500'>Industrial Equipment & ...</span>
            </div>
            <div className='w-24 text-center'>
            <img src="/industry-40.png" alt="" width={55} className='mx-auto'/>
            <span className='text-xs text-gray-500'>Industrial Equipment & ...</span>
            </div>
            </div>
        </div>

            <div className="trendingCategory px-8 shadow-lg py-8 mb-12 xl:w-full mx-auto md:mx-0 w-11/12 ">
                <h5 className='font-bold mb-4'>Trending categories</h5>
                <div className="flex justify-between flex-col md:flex-row ">
                <div className='md:w-40 mb-4 md:mb-0 lg:mx-2 text-center border py-2 rounded'>
                <img src="/headphones.png" alt="" width={55} className='mx-auto'/>
                 <span className='text-xs text-gray-500'>Smart Phones & Tablets</span>
                </div>
                <div className='md:w-40 mb-4 md:mb-0 lg:mx-2 text-center border py-2 rounded'>
                <img src="/headphones.png" alt="" width={55} className='mx-auto '/>
                 <span className='text-xs text-gray-500 mt-2'>Home & Kitchen</span>
                </div>
                <div className='md:w-40 mb-4 md:mb-0 lg:mx-2 text-center border py-2 rounded'>
                <img src="/headphones.png" alt="" width={55} className='mx-auto'/>
                 <span className='text-xs text-gray-500'>Smart Phones & Tablets</span>
                </div>
                <div className='md:w-40 mb-4 md:mb-0 lg:mx-2 text-center border py-2 rounded'>
                <img src="/headphones.png" alt="" width={55} className='mx-auto'/>
                 <span className='text-xs text-gray-500 '>Home & Kitchen</span>
                </div>
                </div>
            </div>

            <div className="topRankProd bg-[#EDF0F5] md:px-8 py-8 mb-20 xl:w-full md:w-11/12">
                <h5 className='font-bold text-lg mb-8 mx-8'>Discover your next business opportunity</h5>
                <div className="flex justify-center flex-col lg:flex-row">
                <div className="card xl:w-80 bg-white mx-8 px-4 py-4 rounded-xl mb-4 lg:mb-0">
                    <h6 className='font-bold mb-8'>Top Ranking Products</h6>
                    <img src="/product_image.png" alt="" className='h-60 mx-auto'/>
                </div>
                <div className="card  xl:w-80 bg-white mx-8 px-4 py-4 rounded-xl">
                <h6 className='font-bold'>New arrivals</h6>
                <img src="/Rectangle58.png" alt="" className='h-60 mx-auto'/>
                </div>
                </div>
            </div>
            <div className="md:w-11/12 xl:w-full">
                <ProductList/>
            </div>
        </div>
        </div>
      <Footer/>
    </>
  )
}
