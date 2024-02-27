"use client"
import withAuth from '@/app/lib/auth/page'
import React from 'react'

const LiveSupport = () => {
  return (
    <div className='text-center text-2xl font-semibold' >Live Support 24/7</div>
  )
}

export default withAuth(LiveSupport)