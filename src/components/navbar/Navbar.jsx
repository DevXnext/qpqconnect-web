"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { getAuth, signOut } from "firebase/auth";
import cookie from 'js-cookie';
const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };
  const handleLogout = async () => {
    

    try {
      cookie.remove('access_token');
      toast.success("Logout Successfully!", {
        onClose: () => {
          router.push("../login");
        },
      });
      
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };
  return (
    <>
    <div className="bg-white  ">
    <div
        className="flex flex-row  justify-between p-5 border-b  pb-2 mb-2 border-gray-150 "
      >
        <div className="items-center ">
          <p className="font-semibold text-2xl">Welcome Gorge</p>
        </div>

        <div className="flex flex-row space-x-3 ">
          <div className="items-center  flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 font-bold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
              />
            </svg>
          </div>
          <div>
            <Image
              src="/icon/Avatar.svg"
              width={45}
              height={45}
              alt="Avatar"
              className=" object-center "
            />
          </div>
          <div className="items-center  flex ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 font-bold"
              onClick={toggleMenu}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
      </div>
      <div>
        {menuVisible && (
          <div className="absolute right-0 mt-2 bg-white w-fit  text-black p-3 rounded-md shadow-md">
            <Link href="/dashboard">
              <p
                className="block text-[18px] py-2 px-4 rounded-md hover:bg-gray-200"
                
              >
                Your Store
              </p>
            </Link>
          
              <button type="submit"
                className="block text-[18px] py-2 px-4 rounded-md hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
              >
                Logout
              </button>
      
          </div>
        )}
      </div>
    </div>
    <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
    </>
  );
};

export default Navbar;
