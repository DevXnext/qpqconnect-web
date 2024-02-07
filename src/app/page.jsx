"use client";

import HeroSection from "@/components/hero-section/page";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="flex flex-col items-center justify-center space-y-5 min-h-screen bg-black text-white">
        <div>
          <Image src="/logo/q.png" width={50} height={50} alt="" />
        </div>
        <div>
          <h2 className="text-4xl font-semibold">Welocome to QPQConnect</h2>
        </div>
        <div>
          <p className="text-2xl font-semibold">Page is Under Construction</p>
        </div>
        <Link
          href="/login"
          className="hover:text-yellow-500 ease-in-out duration-200 "
        >
          Click here to <span className=" font-semibold">Login</span> to access
          your dashboard
        </Link>
      </div>
    </>
  );
}
