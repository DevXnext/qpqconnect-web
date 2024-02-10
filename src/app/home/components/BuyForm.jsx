"use client";

import Image from "next/image";
import React from "react";
import  BuyReqForm  from "./BuyReqForm";

const BuyForm = () => {

  return (
    <div className=" w-full py-5">
      <div className="lg:w-11/12 md:w-4/5 sm:w-4/5 py-10 px-5 mx-auto rounded-2xl bg-[#EDF0F5] lg:grid lg:grid-cols-2 items-center">
        <div className="flex">
          <Image
            src="/OBJECTS.svg"
            height={450}
            width={450}
            alt="svg"
            className="xl:mx-auto"
          />
        </div>
        <div className="lg:ps-10 ">
          <div className="py-10 mr-auto  md:w-full ">
            <h3 className="lg:text-[32px] font-bold">Post Buy Requirements</h3>
          </div>
          <div className="">
            <BuyReqForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyForm;
