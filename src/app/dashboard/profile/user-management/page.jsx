"use client";
import withAuth from "@/app/lib/auth/page";
import AddUser from "@/components/profile-adduser/page";
import AdminDetails from "@/components/profile-user-admin/page";
import UserListing from "@/components/profile-userlist/page";
import Link from "next/link";
import React from "react";
const isProUser = false; 
const UserManagement = () => {
  return (
    <>
        <div className="flex flex-col space-y-5">
        <AdminDetails />
        <div className={`relative flex flex-col space-y-5 border-2 p-2 rounded-lg ${!isProUser && 'disabled'}`}>
          {isProUser ? null : (
            <div className="absolute top-0 left-0 w-full h-full z-10 bg-gray-200 bg-opacity-50 flex items-center justify-center">
              <Link href="/dashboard/" className="flex flex-col space-y-5 rounded-lg p-5 shadow-lg items-center hover:bg-gray-900 
              hover:text-white ease-in-out cursor-pointer justify-center text-gray-800 bg-white">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                </div>
                <h2 className="text-[20px] font-semibold">Upgrade to pro version</h2>
              </Link>
            </div>
          )}
          <AddUser />
          <UserListing />
        </div>
      </div>
    </>
  );
};

export default withAuth(UserManagement);
