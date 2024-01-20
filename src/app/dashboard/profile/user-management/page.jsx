"use client"
import AddUser from '@/components/profile-adduser/page'
import AdminDetails from '@/components/profile-user-admin/page'
import UserListing from '@/components/profile-userlist/page'
import React from 'react'

const UserManagement = () => {
  return (
   <>
   <div className='flex flex-col space-y-5'>
<AdminDetails />
<AddUser />
<UserListing />
   </div>
   
   </>
  )
}

export default UserManagement