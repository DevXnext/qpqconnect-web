"use client"
import withAuth from "@/app/lib/auth/page";
import React from "react";

const Notifications = () => {
  return (
    <>
      <div className="flex flex-col space-y-5 w-full">
        <div className="border shadow hover:shadow-md flex flex-row justify-between px-5">
          <div className="flex flex-row space-x-5 items-center">
          <span className="text-[50px] text-green-700">&#183;
            </span>
            <p className="font-semibold ">Email Notifications</p>
          </div>
        <input className="w-4" type="checkbox"/>
        </div>
        <div className="border shadow hover:shadow-md flex flex-row justify-between px-5">
          <div className="flex flex-row space-x-5 items-center">
          <span className="text-[50px] text-green-700">&#183;
            </span>
            <p className="font-semibold ">SMS Notification</p>
          </div>
        <input className="w-4" type="checkbox"/>
        </div>
      </div>
    </>
  );
};

export default withAuth(Notifications);
