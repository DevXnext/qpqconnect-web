"use client";


import dynamic from "next/dynamic";
const Insights = dynamic(() => import("./DashboardInsights"), { ssr: false });
const DashboardSubscription = dynamic(() => import("./DashboardSubscription"), { ssr: false });
const DashboardTable = dynamic(() => import("./DashboardTable"), { ssr: false });
const DashboardTop = dynamic(() => import("./DashboardTop"), { ssr: false });

import React from "react";
import withAuth from "../lib/auth/page";


const Dashboard = () => {

  return (
    <>
      <div className=" flex flex-col space-y-8 p-4">
        <DashboardTop  />
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="basis-1/2 p-4 rounded-md hover:shadow-xl shadow bg-white ">
            <Insights />
          </div>
          <div>
          </div>
          <div className="basis-1/2 p-4 rounded-md hover:shadow-xl shadow " >
          <div className="relative ">
           
          <h2 className=" cursor-pointer absolute text-[20px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-4 rounded-md">
    Upgrade to pro version
  </h2>
  
  <div className="basis-1/2 p-4 rounded-md hover:shadow-xl shadow bg-white blur-sm">
    <Insights />
  </div>
</div>
    
          </div>
        </div> 
        <DashboardTable />
        <DashboardSubscription />
      </div>  
    </>
  );
};

export default withAuth(Dashboard);
