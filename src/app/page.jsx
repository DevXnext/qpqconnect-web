"use client"

import HeroSection from '@/components/hero-section/page'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
    <HeroSection/>
    <div className='flex flex-col items-center justify-center space-y-5 min-h-screen'> 
    <div>
      <p className='text-3xl font-semibold'>Page is Under Construction</p>
      </div>
      <Link href="/dashboard">Click here to go dashboard</Link>
      </div>
    </>
  )
}
