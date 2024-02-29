
import ProfileNavbar from '@/components/profile-navbar/page';
import React from 'react';


const ProfileDashboardLayout = ({ children }) => {
  return (
    
    <div className="flex flex-col space-y-5">
      <div>
      <ProfileNavbar/>
        </div>   
        <div className="">{children}</div>
     
    </div>
  );
};


export default ProfileDashboardLayout;