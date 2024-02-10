import CardCarousel from '@/components/card-carousel/CardCarousel'
import React from 'react'
export default function FeaturedProducts() {
  return (
    <>
       <div className="w-9/12 flex flex-col mx-auto ">
      <div className=" ">
        <h1 className="md:text-[32px] text-2xl font-bold mb-4 md:ms-5">Featured Products</h1>
        <div className="md:w-full w-11/12">
        <CardCarousel/>
        </div>
      </div>
    </div>
    </>
  )
}
