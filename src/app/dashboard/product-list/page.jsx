import withAuth from "@/app/lib/auth/page";
import Image from "next/image";
import React from "react";

const ProductList = () => {
  return (
    <>
   
       <div className="flex flex-col space-y-5 p-5 md:p-5 lg:p-5">
        <div className="flex flex-row justify-between w-full">
          <p className="text-2xl font-semibold">Product List</p>
          <input
            className="border-2 bg-white rounded-lg px-2 w-full md:w-96 h-12 shadow"
            placeholder="Search product by name.."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        <div className="border-2 rounded-lg p-4 shadow-lg flex items-center flex-col space-y-5 bg-white">
            <Image
              src="/product_image.png"
              width={300}
              height={300}
              alt="product_image"
            />
            <div className="flex flex-col space-y-3">
              <p className="text-1xl font-semibold line-clamp-2 text-wrap">
                Apple Airpods Pro MWP22A M/A Bluetooth 7.1{" "}
              </p>
              <span className="text-gray-400 font-semibold">
                Min Quantity : 150
              </span>
              <div className="flex flex-row space-x-2">
                <p className="text-1xl font-semibold line-clamp-2 text-wrap">
                  $120 /
                </p>{" "}
                <span className="text-gray-400 font-medium">Per Quantity</span>
              </div>
            </div>
          </div>
          <div className="border-2 rounded-lg p-4 shadow-lg flex items-center flex-col space-y-5 bg-white">
            <Image
              src="/product_image.png"
              width={300}
              height={300}
              alt="product_image"
            />
            <div className="flex flex-col space-y-3">
              <p className="text-1xl font-semibold line-clamp-2 text-wrap">
                Apple Airpods Pro MWP22A M/A Bluetooth 7.1{" "}
              </p>
              <span className="text-gray-400 font-semibold">
                Min Quantity : 150
              </span>
              <div className="flex flex-row space-x-2">
                <p className="text-1xl font-semibold line-clamp-2 text-wrap">
                  $120 /
                </p>{" "}
                <span className="text-gray-400 font-medium">Per Quantity</span>
              </div>
            </div>
          </div>
          <div className="border-2 rounded-lg p-4 shadow-lg flex items-center flex-col space-y-5 bg-white">
            <Image
              src="/product_image.png"
              width={300}
              height={300}
              alt="product_image"
            />
            <div className="flex flex-col space-y-3">
              <p className="text-1xl font-semibold line-clamp-2 text-wrap">
                Apple Airpods Pro MWP22A M/A Bluetooth 7.1{" "}
              </p>
              <span className="text-gray-400 font-semibold">
                Min Quantity : 150
              </span>
              <div className="flex flex-row space-x-2">
                <p className="text-1xl font-semibold line-clamp-2 text-wrap">
                  $120 /
                </p>{" "}
                <span className="text-gray-400 font-medium">Per Quantity</span>
              </div>
            </div>
          </div>
          <div className="border-2 rounded-lg p-4 shadow-lg flex items-center flex-col space-y-5 bg-white">
            <Image
              src="/product_image.png"
              width={300}
              height={300}
              alt="product_image"
            />
            <div className="flex flex-col space-y-3">
              <p className="text-1xl font-semibold line-clamp-2 text-wrap">
                Apple Airpods Pro MWP22A M/A Bluetooth 7.1{" "}
              </p>
              <span className="text-gray-400 font-semibold">
                Min Quantity : 150
              </span>
              <div className="flex flex-row space-x-2">
                <p className="text-1xl font-semibold line-clamp-2 text-wrap">
                  $120 /
                </p>{" "}
                <span className="text-gray-400 font-medium">Per Quantity</span>
              </div>
            </div>
          </div>
          <div className="border-2 rounded-lg p-4 shadow-lg flex items-center flex-col space-y-5 bg-white">
            <Image
              src="/product_image.png"
              width={300}
              height={300}
              alt="product_image"
            />
            <div className="flex flex-col space-y-3">
              <p className="text-1xl font-semibold line-clamp-2 text-wrap">
                Apple Airpods Pro MWP22A M/A Bluetooth 7.1{" "}
              </p>
              <span className="text-gray-400 font-semibold">
                Min Quantity : 150
              </span>
              <div className="flex flex-row space-x-2">
                <p className="text-1xl font-semibold line-clamp-2 text-wrap">
                  $120 /
                </p>{" "}
                <span className="text-gray-400 font-medium">Per Quantity</span>
              </div>
            </div>
          </div>
          <div className="border-2 rounded-lg p-4 shadow-lg flex items-center flex-col space-y-5 bg-white">
            <Image
              src="/product_image.png"
              width={300}
              height={300}
              alt="product_image"
            />
            <div className="flex flex-col space-y-3">
              <p className="text-1xl font-semibold line-clamp-2 text-wrap">
                Apple Airpods Pro MWP22A M/A Bluetooth 7.1{" "}
              </p>
              <span className="text-gray-400 font-semibold">
                Min Quantity : 150
              </span>
              <div className="flex flex-row space-x-2">
                <p className="text-1xl font-semibold line-clamp-2 text-wrap">
                  $120 /
                </p>{" "}
                <span className="text-gray-400 font-medium">Per Quantity</span>
              </div>
            </div>
          </div>
          <div className="border-2 rounded-lg p-4 shadow-lg flex items-center flex-col space-y-5 bg-white">
            <Image
              src="/product_image.png"
              width={300}
              height={300}
              alt="product_image"
            />
            <div className="flex flex-col space-y-3">
              <p className="text-1xl font-semibold line-clamp-2 text-wrap">
                Apple Airpods Pro MWP22A M/A Bluetooth 7.1{" "}
              </p>
              <span className="text-gray-400 font-semibold">
                Min Quantity : 150
              </span>
              <div className="flex flex-row space-x-2">
                <p className="text-1xl font-semibold line-clamp-2 text-wrap">
                  $120 /
                </p>{" "}
                <span className="text-gray-400 font-medium">Per Quantity</span>
              </div>
            </div>
          </div>
          <div className="border-2 rounded-lg p-4 shadow-lg flex items-center flex-col space-y-5 bg-white">
            <Image
              src="/product_image.png"
              width={300}
              height={300}
              alt="product_image"
            />
            <div className="flex flex-col space-y-3">
              <p className="text-1xl font-semibold line-clamp-2 text-wrap">
                Apple Airpods Pro MWP22A M/A Bluetooth 7.1{" "}
              </p>
              <span className="text-gray-400 font-semibold">
                Min Quantity : 150
              </span>
              <div className="flex flex-row space-x-2">
                <p className="text-1xl font-semibold line-clamp-2 text-wrap">
                  $120 /
                </p>{" "}
                <span className="text-gray-400 font-medium">Per Quantity</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row space-x-5 py-5 w-full items-center justify-center">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            troke="currentColor"
            className="w-6 h-6  hover:text-gray-600 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>

          <button className="bg-gray-800 px-3 py-2 hover:bg-gray-200 hover:text-black text-white rounded-md">
            1
          </button>
          <button className="bg-gray-200 px-3 py-2 hover:bg-gray-800 hover:text-white text-black rounded-md">
            2
          </button>
          <button className="bg-gray-200 px-3 py-2 hover:bg-gray-800 hover:text-white text-black rounded-md">
            3
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 " 
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
         
        </div>
      </div>
    </>

  );
};

export default withAuth(ProductList);
