import React from 'react'
import { Avatar,AvatarImage,AvatarFallback } from '@/components/ui/avatar'
export default function HomeNavbar() {
  return (
    <>
       <div className="flex justify-between items-center md:px-12 px-6 py-8">
        <img src="/logo.png" alt="" className='md:w-12 w-10'/>
        <div className="flex">
            <button className="text-white px-8 md:flex hidden py-2">Login</button>
            <button className='bg-white rounded-3xl md:flex hidden px-8 py-2'>Signup</button>
            <Avatar className='ms-8'>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

        </div>
        </div>
    </>
  )
}
