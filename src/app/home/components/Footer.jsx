import SocialMedia from "./SocialMedia";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="footer w-full flex justify-center md:flex-row flex-col md:items-start items-center md:text-start text-center mt-20 bg-[#EEEEEE] py-24">
      <div className="xl:mx-16 lg:mx-8 md:mx-6 mb-4 md:mb-0">
        <h5 className="font-bold mb-4">Category</h5>
        {Array.from({ length: 6 }).map(() => (
          <Link href="/" className="block text-sm mb-2">
            First link
          </Link>
        ))}
      </div>
      <div className="xl:mx-16 lg:mx-8 md:mx-6 mb-4 md:mb-0">
        <h5 className="font-bold mb-4">Category</h5>
        {Array.from({ length: 3 }).map(() => (
          <Link href="/" className="block text-sm mb-2">
            First link
          </Link>
        ))}
      </div>
      <div className="xl:mx-16 lg:mx-8 md:mx-6 mb-4 md:mb-0">
        <h5 className="font-bold mb-4">Category</h5>
        {Array.from({ length: 6 }).map(() => (
          <Link href="/" className="block text-sm mb-2">
            First link
          </Link>
        ))}
      </div>
      <div className="xl:mx-16 lg:mx-8 md:mx-6 mb-4 md:mb-0">
        <h5 className="font-bold mb-4">Category</h5>
        {Array.from({ length: 4 }).map(() => (
          <Link href="/" className="block text-sm mb-2">
            First link
          </Link>
        ))}
      </div>
      <div className="xl:mx-16 lg:mx-8 md:mx-6 mb-4 md:mb-0">
        <img
          src="/assets/home/Vector.svg"
          alt=""
          width={64}
          className=""
        />
        <p className="text-xs my-4">© Copyright 2023 Canmart</p>
        <div className="flex">
          <SocialMedia />
        </div>
      </div>
    </div>
  );
};
