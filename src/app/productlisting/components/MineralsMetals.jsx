"use client";

import { Footer } from "@/app/home/components/Footer";
import NavbarDark from "@/components/navbar/NavbarDark";

export default function MineralsMetals() {
  return (
    <>
      <NavbarDark />
      <div className="container w-full flex flex-col items-center md:block py-8 ">
        <h4 className="font-bold text-2xl mb-8 ms-2">Minerals and Metals</h4>
        {/* <div className="flex justify-around"> */}
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 gap-8 md:grid-cols-2">
            {Array(21).fill(
              <div className="flex w-72 md:w-80 border-2 px-4 py-2 rounded-xl mb-4 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className="h-20 me-4"
                />
                <div>
                  <h5 className="font-bold mb-3">Steel & Stainless Steel</h5>
                  <p className="text-xs text-gray-500">
                    Ball & roller bearings, bearing units, track rollers,
                    housing and accessories possibly a third row of text.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      {/* </div> */}
      <Footer />
    </>
  );
}
