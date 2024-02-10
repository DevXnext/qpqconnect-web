import React from 'react'
import { Avatar,AvatarFallback,AvatarImage } from '@/components/ui/avatar'
export default function NavbarDark() {
  return (
    <>
       <div className="flex justify-between w-full items-center md:px-12 px-4 py-8">
        <img src="/logo/q-black.svg" alt="" className='w-12'/>
        <div className="flex">
            <button className="text-sm md:text-md md:px-4 py-2">About Us <span className='md:ms-4'>|</span></button>
            <button className='text-sm md:text-md rounded-3xl md:px-2 py-2'>Contact Us</button>
            <Avatar className='md:ms-8 ms-2'>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

        </div>
        </div>
    </>
  )
}
