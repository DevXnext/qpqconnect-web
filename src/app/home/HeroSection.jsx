import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <>
      <div className="relative h-screen">
        <Image
          src="/banner/banner.jpg"
          alt="Banner Image"
          layout="fill"
          objectFit="cover"
          className="filter brightness-50"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-3">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center">The leading B2B </h1>
          <p className="text-2xl md:text-5xl font-semibold mb-3 text-center">
            platform for global trade
          </p>

          <p className="text-white text-lg md:text-xl pb-8 text-center">
            Search for products & find verified sellers near you
          </p>
          <div className="w-full md:w-[500px] flex items-center bg-gray-900 rounded-full px-3 py-1">
            <div className="mr-2">
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="flex-grow h-10 bg-gray-900 opacity-80 outline-none text-white px-4 placeholder-white"
              placeholder="Search product or service name"
            />
            <button className="bg-white rounded-full text-gray-800 px-3 py-2 font-semibold w-28 hover:bg-gray-200 ">
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
