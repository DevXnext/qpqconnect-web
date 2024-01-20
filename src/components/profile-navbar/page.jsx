"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
const ProfileNavbar = () => {
  const pathname = usePathname();
  return (
    <>
    <div className="overflow-x-auto">
  <div className="flex flex-row space-x-10 border-b pt-2">
    <Link
      href="/dashboard/profile/"
      className={`hover:font-bold font-medium hover:border-b-2 pb-2 hover:border-black  text-center
        ${
          pathname === "/dashboard/profile"
            ? " font-bold  border-b-2 border-black  text-[18px]"
            : ""
        }
      `}
    >
      <p>Business Details</p>
    </Link>
    <Link
      href="/dashboard/profile/user-management"
      className={`hover:font-bold font-medium hover:border-b-2 pb-2 hover:border-black  text-center
        ${
          pathname === "/dashboard/profile/user-management"
            ? " font-bold  border-b-2 border-black  text-[18px]"
            : ""
        }
      `}
    >
      <p>User Management</p>
    </Link>
    <Link
      href="/dashboard/profile/type-and-services"
      className={`hover:font-bold font-medium hover:border-b-2 pb-2 hover:border-black text-center
        ${
          pathname === "/dashboard/profile/type-and-services"
            ? " font-bold  border-b-2 border-black  text-[18px]"
            : ""
        }
      `}
    >
      <p>Type and Services</p>
    </Link>
    <Link
      href="/dashboard/profile/tax-information-and-certification"
      className={`hover:font-bold font-medium hover:border-b-2 pb-2 hover:border-black  text-center
        ${
          pathname === "/dashboard/profile/tax-information-and-certification"
            ? " font-bold  border-b-2 border-black text-[18px]"
            : ""
        }
      `}
    >
      <p>Tax Information & Certification</p>
    </Link>
    <Link
      href="/dashboard/profile/product-by-interest"
      className={`hover:font-bold font-medium hover:border-b-2 pb-2 hover:border-black  text-center
        ${
          pathname === "/dashboard/profile/product-by-interest"
            ? " font-bold  border-b-2 border-black text-[18px]"
            : ""
        }
      `}
    >
      <p>Product by Interest</p>
    </Link>
  </div>
</div>

    </>
  );
};

export default ProfileNavbar;
