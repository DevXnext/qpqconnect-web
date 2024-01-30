import withAuth from '@/app/lib/auth/page'
import React from 'react'

const ProductInterest = () => {
  return (
   <>
    <div className="flex flex-col space-y-5 p-5 bg-white shadow-sm rounded-sm">
  <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8">
    <div className="flex-1 flex-col space-y-3">
      <label className="font-semibold text-gray-700">Requirement</label>
      <input
        type="text"
        className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
        placeholder="Type name here.."
      />
    </div>
  </div>
  <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8">
    <div className="flex-1 flex-col space-y-3">
      <label className="font-semibold text-gray-700">Frequency</label>
      <select className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3">
              <option>10-100</option>0
              <option>100-1000</option>
              <option>1000-10000</option>
            </select>
    </div>
    <div className="flex-1 flex-col space-y-3">
      <label className="font-semibold text-gray-700">Quantity</label>
      <select className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3">
              <option>10-100</option>0
              <option>100-1000</option>
              <option>1000-10000</option>
            </select>
    </div>
    <div className="flex-1 flex-col space-y-3">
      <label className="font-semibold text-gray-700">Quantity Unit</label>
      <select className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3">
              <option>Kilogram</option>0
              <option>Meter</option>
              <option>Centimeter</option>
              <option>Gram</option>
              <option>Pieces</option>
              <option>Packet</option>

            </select>
    </div>
  </div>
  <div className="flex flex-row space-x-6">
    <button className="bg-black px-8 py-2 rounded-lg text-1xl  font-semibold
    hover:bg-white hover:border-black hover:text-black border-2 text-white">Send query</button>
    <button className="bg-white px-8 py-2 rounded-lg text-1xl  font-semibold
    hover:bg-black border-black hover:text-white border-2 text-black">Reset</button>
  </div>

  
</div>
   </>
  )
}

export default withAuth(ProductInterest)