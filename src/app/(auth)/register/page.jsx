"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import { app } from "../../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
const Register = () => {
  const [companyName, setCompanyName] = useState("");
  // const [countryCode, setCountryCode] = useState("+1");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const formRef = useRef();
  const router = useRouter();
  const generateAccessToken = () => {
    return uuidv4();
  };
  const registerUser = async (companyName, mobileNumber, emailAddress) => {
    try {
      const db = getFirestore(app);
      const usersCollection = collection(db, "users");

      //Company
      const CompanyduplicateQuery = query(
        usersCollection,
        where("companyName", "==", companyName)
      );
      const CompanyduplicateSnapshot = await getDocs(CompanyduplicateQuery);

      if (CompanyduplicateSnapshot.docs.length > 0) {
        // Display a toast notification for duplicate entry
        toast.error("User with the same Company Name already exists");
        return;
      }

      //Mobile
      const duplicateMobileQuery = query(
        usersCollection,
        where("mobileNumber", "==", mobileNumber)
      );
      const duplicateMobileSnapshot = await getDocs(duplicateMobileQuery);

      if (duplicateMobileSnapshot.docs.length > 0) {
        toast.error("User with the same Mobile Number already exists");
        return;
      }

      //Email
      const duplicateEmailQuery = query(
        usersCollection,
        where("emailAddress", "==", emailAddress)
      );
      const duplicateEmailSnapshot = await getDocs(duplicateEmailQuery);

      if (duplicateEmailSnapshot.docs.length > 0) {
        toast.error("User with the same Email address already exists");
        return;
      }

      const accessToken = generateAccessToken();

      const userDocRef = await addDoc(usersCollection, {
        companyName,
        mobileNumber,
        emailAddress,
        accessToken,
        timestamp: serverTimestamp(),
      });

      toast.success("Company Registered successfully", {
        onClose: () => {
          router.push(
            `/login?companyName=${companyName}&mobileNumber=${mobileNumber}&emailAddress=${emailAddress}`
          );
        },
      });
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Error registering user. Please try again later.");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (formRef.current.checkValidity()) {
      registerUser(companyName, mobileNumber, emailAddress);
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

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
            <div
              className="flex flex-col space-y-5 shadow-lg rounded-md w-full  m-10 lg:m-0 lg:w-[500px] 
            hover:shadow-gray-200 bg-white border border-gray-200 p-10"
            >
              <div className="flex flex-col space-y-2">
                <p className="text-2xl font-semibold">Register</p>
                <span className="text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </span>
              </div>
              <form ref={formRef} onSubmit={handleRegister}>
                <div className="flex flex-col space-y-3">
                  <div className="flex flex-col space-y-3 ">
                    <label className="text-1xl font-semibold">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      className="border border-gray-300 rounded-md h-12 p-3"
                      placeholder="QPQ Connect"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-3 ">
                    <label className="text-1xl font-semibold">
                      Mobile Number
                    </label>
                    <PhoneInput
                      containerStyle={{}}
                      inputStyle={{
                        height: "3rem",
                        paddingLeft: "3rem",
                        fontSize: "1rem",
                        border: "1px solid #ccc",
                        borderRadius: "0.25rem",
                        width: "100%",
                      }}
                      buttonStyle={{}}
                      dropdownStyle={{}}
                      country={"us"}
                      value={mobileNumber}
                      onChange={(mobileNumber) =>
                        setMobileNumber("+" + mobileNumber)
                      }
                    />
                    {/* <div className="flex flex-row space-x-2">
                    <div className="basis-[12%]">
                      <select
                        className="border border-gray-300 rounded-md w-full h-12 "
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                      >
                        <option value="+1">+1</option>
                        <option value="+6">+6</option>
                        <option value="+91">+91</option>
                        <option value="+91">+420</option>
                      </select>
                    </div>
                    <div className="basis-[88%]">
                      <input
                        type="number"
                        name="mobileNumber"
                        className="border border-gray-300 rounded-md w-full h-12 p-3"
                        placeholder="789456123"
                        value={mobileNumber}  
                        onChange={(e) => setMobileNumber(e.target.value)} required
                      /> 
                    </div>
                  </div> */}
                  </div>
                  <div className="flex flex-col space-y-3 ">
                    <label className="text-1xl font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="EmailAddress"
                      className="border border-gray-300 rounded-md h-12 p-3"
                      placeholder="qpq@connect.com"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex py-5 flex-col space-y-5">
                    <button
                      type="submit"
                      className="text-center bg-black w-full text-white p-3 rounded-lg hover:bg-gray-800"
                    >
                      Create an account
                    </button>
                    <Link
                      href="./login"
                      className="text-base text-gray-400 hover:text-gray-800 cursor-pointer"
                    >
                      Already have an account ? Sign In
                    </Link>
                  </div>
                </div>
              </form>
            </div>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
