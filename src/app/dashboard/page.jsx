"use client";

import Insights from "@/components/dashboard-insights/page";
import DashboardSubscription from "@/components/dashboard-subscription/page";
import DashboardTable from "@/components/dashboard-table/page";
import DashboardTop from "@/components/dashboard-top/page";
import React from "react";
import withAuth from "@/app/lib/auth/page";

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
            {/* <Insights /> */}
          </div>
        </div>
        <DashboardTable />
        <DashboardSubscription />
      </div>  
    </>
  );
};

export default withAuth(Dashboard);
