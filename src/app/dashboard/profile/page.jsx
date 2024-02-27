"use client"
import ProfileBusinessForm from "./ProfileBusinessForm";
import ProfileBusinessMedia from "./ProfileBusinessMedia";
import React from "react";
import ProfileMedia from "./ProfileMedia";
import withAuth from "@/app/lib/auth/page";


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
