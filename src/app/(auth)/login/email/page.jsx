import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginEmail = () => {
 
  return (
    <>
      <div className="flex flex-row h-screen  w-full lg:flex-row">
      <div className="lg:w-1/4 hidden lg:flex">
          <Image
            src="/register-back.png"
            width={1000}
            height={1000}
            alt=""
            className="w-full h-full rounded-r-[50px] object-center"
          />
        </div>
        <div className="lg:w-3/4 flex flex-col w-full ">
          {/* Logo Section */}
          <div className="w-full mt-4  lg:w-1/4 flex lg:items-left items-center lg:justify-start justify-center">
            <Image
              src="/logo/q-black.svg"
              width={75}
              height={75}
              alt=""
              className="ml-6"
            />
          </div>
          <div className="w-full h-full flex items-center justify-center ">
            <div className="flex flex-col space-y-5 shadow-lg rounded-md w-full  m-10 lg:m-0 lg:w-[500px] 
            hover:shadow-gray-200 bg-white border border-gray-200 p-10">
              <div className="flex flex-col space-y-2">
                <p className="text-2xl font-semibold">Login</p>
                <span className="text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </span>
              </div>
              <div className="flex flex-col space-y-3">
                
              <div className="flex flex-col space-y-3 ">
                  <label className="text-1xl font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="EmailAddress"
                    className="border border-gray-300 rounded-md h-12 p-3"
                    placeholder="qpq@connect.com"
                  />
                </div>
              
                <div className="flex py-5 flex-col space-y-5">
                  <button className="text-center bg-black w-full text-white p-3 rounded-lg hover:bg-gray-800">
                 Send OTP
                  </button>
                  <Link href="./" className="text-base text-gray-400 hover:text-gray-800 cursor-pointer">Login with Mobile Number</Link>

                  <Link href="./register" className="text-base text-gray-600 hover:text-gray-800 cursor-pointer text-center">Don&#39;t have account?Register with us</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginEmail;
