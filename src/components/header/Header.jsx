"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Button from "./Button";

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleLogin = () => {
    // Logic for handling login
  };

  const handleSignup = () => {
    // Logic for handling signup
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full text-black z-50 ${
        scrolling ? "bg-white" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center p-5 relative z-50">
        <div>
          <Image
            src={scrolling ? "/logo/q-black.svg" : "/logo/q.png"}
            width={60}
            height={60}
            alt="Logo"
          />
        </div>
        <div className="flex flex-row space-x-8 items-center">
          <Button
            onClick={handleLogin}
            className={`hover:bg-${
              scrolling ? "black" : "white"
            } text-2xl rounded-full px-3 py-2 hover:text-${
              scrolling ? "white" : "black"
            }  text-${scrolling ? "black" : "white"}`}
            text="Login"
          />
          <Button
            onClick={handleSignup}
            className={`hover:bg-${scrolling ? "black" : "white"} 
            hover:text-${scrolling ? "white" : "black"}  
            bg-${ scrolling ? "black" : "white" } text-${scrolling ? "white" : "black"} text-2xl rounded-full px-3 py-2  `}
            text="Signup"
          />
          <Link
            href="/"
            className="text-xl font-semibold cursor-pointer"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-8 h-8 stroke-${scrolling ? "black" : "white"}  hover:bg-${scrolling ? "white" : "black"} hover:stroke-${scrolling ? "black" : "white"} rounded-full `}
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
        <div className="absolute right-0 mt-2 bg-white text-black p-2 rounded shadow-md z-50">
          <Link href="/dashboard">
            <p
              className="block py-2 px-4 hover:bg-gray-200"
              onClick={closeMenu}
            >
              Dashboard
            </p>
          </Link>
          <Link href="/logout">
            <p
              className="block py-2 px-4 hover:bg-gray-200"
              onClick={closeMenu}
            >
              Logout
            </p>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
