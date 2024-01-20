"use client"

import ProfileBusinessForm from "@/components/profile-business-form/page";
import BusinessListing from "@/components/profile-business-listing/page";
import ProfileBusinessMedia from "@/components/profile-business-media/page";

import Link from "next/link";
import React from "react";

const Profile = () => {
  return (
    <>
      <div className="flex flex-col space-y-5  w-full">
        <div>
          <ProfileBusinessForm />
        </div>
        <div>
          <ProfileBusinessMedia />
        </div>
        <div>
          <BusinessListing />
        </div>
      </div>
    </>
  );
};

export default Profile;
