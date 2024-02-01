"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const pathname = usePathname();
  return (
    <>
      <div
      className={`flex flex-col space-y-5 p-5 w-${isSidebarOpen ? '70' : '12'} text-white shadow h-100% bg-gray-900 transition-all duration-300 ease-in-out`}
      >
       
        <div className="flex flex-row justify-between">
          <div className="cursor-pointer">
            <Image src="/logo/q.png" width={35} height={35} alt="LOGO" />
          </div>
          <div className="cursor-pointer" onClick={toggleSidebar}>
            <Image
              src={
                isSidebarOpen ? "/icon/hamburger.png" : "/icon/hamburger.png"
              }
              width={35}
              height={35}
              alt="Burger"
            />
          </div>
        </div>

        <div>
          <p className={` font-semibold text-base text-${isSidebarOpen ? 'center' : 'left'}`}>Main Menu</p>
        </div>
        <div className="flex flex-col space-y-2 text-[18px]">
          <Link
            href="/dashboard/"
            className={`flex flex-row space-x-5 cursor-pointer hover:bg-white 
            hover:text-black stroke-white justify-${isSidebarOpen ? 'center' : 'left'} rounded-lg hover:stroke-black py-2 px-5 w-full
            ${
              pathname === "/dashboard"
                ? " bg-white stroke-black  text-black"
                : ""
            }
            
            `}
          >
            <div>
              <svg
                viewBox="0 0 22 22"
                fill="none"
                className=" w-6 h-6 "
                strokeWidth={1.5}
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.4166 7.9833L12.528 4.18097C11.6454 3.49436 10.4094 3.49436 9.52684 4.18097L4.63734 7.9833C4.04188 8.44637 3.69374 9.15856 3.69409 9.91289V16.5129C3.69409 17.5254 4.5149 18.3462 5.52743 18.3462H16.5274C17.5399 18.3462 18.3608 17.5254 18.3608 16.5129V9.91289C18.3608 9.15847 18.0124 8.44622 17.4166 7.9833"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.6666 13.7501C12.6408 14.972 9.35725 14.972 7.33325 13.7501"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            {!isSidebarOpen && (
              <div>
                <p className="font-semibold ">Dashboard</p>
              </div>
            )}
          </Link>
        </div>

        <div>
          <p className={` font-semibold text-base text-${isSidebarOpen ? 'center' : 'left'}`}>Profile</p>
        </div>
        <div className="flex flex-col space-y-2 text-[18px]">
          <Link
            href="/dashboard/profile/"
            className={`flex flex-row space-x-5 cursor-pointer justify-${isSidebarOpen ? 'center' : 'left'} hover:bg-white hover:text-black stroke-white rounded-lg hover:stroke-black py-2 px-5 w-full
            ${
              pathname === "/dashboard/profile"
                ? " bg-white stroke-black text-black"
                : ""
            }
            
            `}
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                />
              </svg>
            </div>
            {!isSidebarOpen && (
              <div>
               <p className="font-semibold">Business Details</p>
              </div>
            )}
           
          </Link>
          <Link
            href="/dashboard/profile/user-management"
            className={`flex flex-row space-x-5 cursor-pointer justify-${isSidebarOpen ? 'center' : 'left'} hover:bg-white hover:text-black stroke-white rounded-lg hover:stroke-black py-2 px-5 w-full
            ${
              pathname === "/dashboard/profile/user-management"
                ? " bg-white stroke-black text-black"
                : ""
            }
            
            `}
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
            </div>
            {!isSidebarOpen && (
              <div>
              
               <p className="font-semibold ">User Management</p>
              </div>
            )}
          </Link>
          
          <Link
            href="/dashboard/profile/type-and-services"
            className={`flex flex-row space-x-5 cursor-pointer justify-${isSidebarOpen ? 'center' : 'left'} hover:bg-white hover:text-black stroke-white rounded-lg hover:stroke-black py-2 px-5 w-full
            ${
              pathname ===
              "/dashboard/profile/type-and-services"
                ? " bg-white stroke-black text-black"
                : ""
            }
            
            `}
          >
            <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
              </svg>
            </div>
            {!isSidebarOpen && (
              <div>
              
               <p className="font-semibold ">Type And Services</p>
              </div>
            )}
          
   
          </Link>
          <Link
            href="/dashboard/profile/tax-information-and-certification"
            className={`flex flex-row space-x-5 cursor-pointer justify-${isSidebarOpen ? 'center' : 'left'} hover:bg-white hover:text-black stroke-white rounded-lg hover:stroke-black py-2 px-5 w-full
            ${
              pathname ===
              "/dashboard/profile/tax-information-and-certification"
                ? " bg-white stroke-black text-black"
                : ""
            }
            
            `}
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                />
              </svg>
            </div>
            {!isSidebarOpen && (
              <div>
              
               <p className="font-semibold ">Tax Information</p>
              </div>
            )}
          
   
          </Link>
        </div>

        <div>
          <p className={` font-semibold text-base text-${isSidebarOpen ? 'center' : 'left'}`}>Product</p>
        </div>
        <div className="flex flex-col space-y-2 text-[18px]">
          <Link
            href="/dashboard/product-add"
            className={`flex flex-row space-x-5 cursor-pointer justify-${isSidebarOpen ? 'center' : 'left'} hover:bg-white hover:text-black stroke-white rounded-lg hover:stroke-black py-2 px-5 w-full
            ${
              pathname === "/dashboard/product-add"
                ? " bg-white stroke-black text-black"
                : ""
            }
            
            `}
          >
            <div>
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 19 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.583 5.445h.01M8.86 16.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 10.31 1l5.734.007A1.968 1.968 0 0 1 18 2.983v5.5a.994.994 0 0 1-.316.727l-7.439 7.5a.975.975 0 0 1-1.385.001Z"
                />
              </svg>
            </div>
            {!isSidebarOpen && (
              <div>
              
               <p className="font-semibold ">Add Product</p>
              </div>
            )}
           
          </Link>
          <Link
            href="/dashboard/product-list"
            className={`flex flex-row space-x-5 cursor-pointer justify-${isSidebarOpen ? 'center' : 'left'} hover:bg-white hover:text-black stroke-white rounded-lg hover:stroke-black py-2 px-5 w-full
            ${
              pathname === "/dashboard/product-list"
                ? " bg-white stroke-black text-black"
                : ""
            }
            
            `}
          >
            <div>
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3.308 9a2.257 2.257 0 0 0 2.25-2.264 2.25 2.25 0 0 0 4.5 0 2.25 2.25 0 0 0 4.5 0 2.25 2.25 0 1 0 4.5 0C19.058 5.471 16.956 1 16.956 1H3.045S1.058 5.654 1.058 6.736A2.373 2.373 0 0 0 3.308 9Zm0 0a2.243 2.243 0 0 0 1.866-1h.767a2.242 2.242 0 0 0 3.733 0h.767a2.242 2.242 0 0 0 3.733 0h.767a2.247 2.247 0 0 0 1.867 1A2.22 2.22 0 0 0 18 8.649V19H9v-7H5v7H2V8.524c.37.301.83.469 1.308.476ZM12 12h3v3h-3v-3Z"
                />
              </svg>
            </div>
            {!isSidebarOpen && (
              <div>
              
               <p className="font-semibold ">Product List</p>
              </div>
            )}
          </Link>
        </div>

        <div>
          <p className={` font-semibold text-base text-${isSidebarOpen ? 'center' : 'left'}`}>Lead Center</p>
        </div>
        <div className="flex flex-col space-y-2 text-[18px]">
          <Link
            href="/dashboard/lead-center/rfq-incoming"
            className={`flex flex-row space-x-5 cursor-pointer justify-${isSidebarOpen ? 'center' : 'left'} hover:bg-white hover:text-black stroke-white rounded-lg hover:stroke-black py-2 px-5 w-full
            ${
              pathname === "/dashboard/lead-center/rfq-incoming"
                ? " bg-white stroke-black text-black"
                : ""
            }
            
            `}
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>
            </div>
            {!isSidebarOpen && (
              <div>
              
               <p className="font-semibold ">RFQ Incoming</p>
              </div>
            )}
          </Link>
          
          <Link
            href="/dashboard/lead-center/rfq-outgoing"
            className={`flex flex-row space-x-5 cursor-pointer justify-${isSidebarOpen ? 'center' : 'left'} hover:bg-white hover:text-black stroke-white rounded-lg hover:stroke-black py-2 px-5 w-full
            ${
              pathname === "/dashboard/lead-center/rfq-outgoing"
                ? " bg-white stroke-black text-black"
                : ""
            }
            
            `}
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>
            </div>
            {!isSidebarOpen && (
              <div>
              
               <p className="font-semibold ">RFQ Outgoing</p>
              </div>
            )}
           
            </Link>
          {/* <div className="flex flex-row space-x-5 cursor-pointer hover:bg-white hover:text-black stroke-white rounded-lg hover:stroke-black py-2 px-5 w-full ">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold ">Calendar</p>
            </div>
          </div> */}
        </div>
        <div>
          <p className={` font-semibold text-base text-${isSidebarOpen ? 'center' : 'left'}`}>Personal Settings</p>
        </div>
        <div className="flex flex-col space-y-2 text-[18px]">
       
          <Link
            href="/dashboard/personal-settings/change-password"
            className={`flex flex-row space-x-5 cursor-pointer justify-${isSidebarOpen ? 'center' : 'left'} hover:bg-white hover:text-black stroke-white rounded-lg hover:stroke-black py-2 px-5 w-full
            ${
              pathname === "/dashboard/personal-settings/change-password"
                ? " bg-white stroke-black text-black"
                : ""
            }
            
            `}
          >
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
</svg>

            </div>
            {!isSidebarOpen && (
              <div>
              
               <p className="font-semibold ">Change Password</p>
              </div>
            )}
          </Link>
         
        </div>
        <div>
          <p className={` font-semibold text-base text-${isSidebarOpen ? 'center' : 'left'}`}>Settings</p>
        </div>
        <div className="flex flex-col space-y-2 text-[18px]">
       
          <Link
            href="/dashboard/settings/notifications"
            className={`flex flex-row space-x-5 cursor-pointer justify-${isSidebarOpen ? 'center' : 'left'} hover:bg-white hover:text-black stroke-white rounded-lg hover:stroke-black py-2 px-5 w-full
            ${
              pathname === "/dashboard/settings/notifications"
                ? " bg-white stroke-black text-black"
                : ""
            }
            
            `}
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                />
              </svg>
            </div>
            {!isSidebarOpen && (
              <div>
              
               <p className="font-semibold ">Notifications</p>
              </div>
            )}
          </Link>
          <Link
          href="/dashboard/settings/live-support"
            className={`flex flex-row space-x-5 cursor-pointer justify-${isSidebarOpen ? 'center' : 'left'} hover:bg-white hover:text-black stroke-white rounded-lg hover:stroke-black py-2 px-5 w-full
            ${
              pathname === "/dashboard/settings/live-support"
                ? " bg-white stroke-black text-black"
                : ""
            }
            
            `}
          >
            <div>
              <svg
                class="w-6 h-6  text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12.079 4.839a3 3 0 0 0-4.255.1M11 18h1.083A3.916 3.916 0 0 0 16 14.083V7A6 6 0 1 0 4 7v7m7 4v-1a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1Zm-7-4V8H3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1Zm12-6h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1V8Z"
                />
              </svg>
            </div>
            {!isSidebarOpen && (
              <div>
              
               <p className="font-semibold ">Live Support</p>
              </div>
            )}
           
          </Link>
         
          <Link
          href="/dashboard/settings/faq"
            className={`flex flex-row space-x-5 cursor-pointer justify-${isSidebarOpen ? 'center' : 'left'} hover:bg-white hover:text-black stroke-white rounded-lg hover:stroke-black py-2 px-5 w-full
            ${
              pathname === "/dashboard/settings/faq"
                ? " bg-white stroke-black text-black"
                : ""
            }
            
            `}
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </div>
            {!isSidebarOpen && (
              <div>
              
               <p className="font-semibold ">FAQ</p>
              </div>
            )}
          </Link>
        </div>
        
       
      </div>
    </>
  );
};

export default Sidebar;