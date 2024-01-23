import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex  bg-gray-50 ">
      <Sidebar className=""/>

      <div className="flex-1 flex flex-col overflow-hidden ">
        <div className="">
          <Navbar  />
        </div>
        <div className="flex-1 overflow-x-hidden overflow-y-auto ">
          <div className="px-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
