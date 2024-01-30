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
          <div className="basis-1/2 p-4 rounded-md hover:shadow-xl shadow bg-white">
            <Insights />
          </div>
          <div className="basis-1/2 p-4 rounded-md hover:shadow-xl shadow bg-white" >
            <Insights />
          </div>
        </div>
        <DashboardTable />
        <DashboardSubscription />
      </div>  
    </>
  );
};

export default withAuth(Dashboard);
