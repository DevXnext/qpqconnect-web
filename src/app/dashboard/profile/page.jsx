"use client"

import ProfileBusinessForm from "@/components/profile-business-form/page";
import ProfileBusinessMedia from "@/components/profile-business-media/page";
import withAuth from "../../lib/auth/page";
import Link from "next/link";
import React from "react";
import ProfileMedia from "@/components/profile-media/page";

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
          <ProfileMedia />
        </div>
      </div>
    </>
  );
};

export default withAuth(Profile);
