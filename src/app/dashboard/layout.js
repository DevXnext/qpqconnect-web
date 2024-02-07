"use client"
import React, { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";

const DashboardLayout = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="flex bg-gray-50">
    <div className={` ${sidebarVisible ? "block" : "hidden"} sm:flex`}>
      {/* Sidebar visible only on larger screens */}
      <Sidebar />
    </div>

    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="">
        <Navbar toggleSidebar={toggleSidebar}/>
      </div>
      <div className="flex-1 overflow-x-hidden overflow-y-auto px-0  sm:px-4">
        {/* Children taking full width on all screens */}
        {children}
      </div>
    </div>
  </div>
  );
};

export default DashboardLayout;
