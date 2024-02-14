"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
    const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };
  return (
    <>
      <header className=" text-black bg-transparent">
      <div className="container mx-auto flex justify-between items-center p-5">
        <div>
          <Image src="/logo/q-black.svg" width={60} height={60} alt="Logo" />
        </div>
        <div className="flex flex-row space-x-8 items-center">
          <Link
            href="/"
            className="flex flex-row space-x-2 font-semibold text-xl hover:bg-white hover:border hover:text-black"
          >
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
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <p>Login</p>
          </Link>
          <Link
            href="/"
            className="flex flex-row space-x-2 font-semibold text-xl hover:bg-white hover:border hover:text-black"
          >
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
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>

            <p>Signup</p>
          </Link>
          <Link href="/" className="text-xl font-semibold cursor-pointer" onClick={toggleMenu}> 
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
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </Link>
        </div>
        
      </div>
      {menuVisible && (
            <div className="absolute right-0 mt-2 bg-white text-black p-2 rounded shadow-md">
              <Link href="/dashboard">
                <p className="block py-2 px-4 hover:bg-gray-200" onClick={closeMenu}>
                  Dashboard
                </p>
              </Link>
              <Link href="/logout">
                <p className="block py-2 px-4 hover:bg-gray-200" onClick={closeMenu}>
                  Logout
                </p>
              </Link>
            </div>
          )}
    </header>
    </>
  );
};

export default Header;
