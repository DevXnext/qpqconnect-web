"use client"
import withAuth from "@/app/lib/auth/page";
import React from "react";

const FAQ = () => {
  return (
    <>
      <div className="text-center text-2xl font-semibold">FAQ</div>
    </>
  );
};

export default withAuth(FAQ);
