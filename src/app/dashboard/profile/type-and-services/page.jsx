"use client";
import React, { useState, useEffect, useRef } from "react";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { app } from "../../../firebase";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { parseCookies } from "nookies";
import withAuth from "@/app/lib/auth/page";
const TypeAndServices = () => {

  const cookies = parseCookies();
  const user_access_token = cookies.user_access_token;

  const [userData, setUserData] = useState({
    BusinessType: "",
    ModePayment: "",
    OwnershipType: "",
    CompanyDescription: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore(app);

        const userCollectionRef = collection(db, "users");
        const userQuery = query(
          userCollectionRef,
          where("accessToken", "==", user_access_token)
        );
        const userQuerySnapshot = await getDocs(userQuery);


      
        if (!userQuerySnapshot.empty) {
          const loggedInUserDoc = userQuerySnapshot.docs[0];
          const loggedInUserData = loggedInUserDoc.data();

          setUserData({
            BusinessType: loggedInUserData.BusinessInformationObject?.TypeAndServices?.BusinessType || "",
            ModePayment: loggedInUserData.BusinessInformationObject?.TypeAndServices?.ModePayment || "",
            OwnershipType: loggedInUserData.BusinessInformationObject?.TypeAndServices?.OwnershipType || "",
            CompanyDescription: loggedInUserData.BusinessInformationObject?.TypeAndServices?.CompanyDescription || "",
          });
        } else {
          toast.error("Logged-in user not found");
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchData();
  }, [user_access_token]); 

const Type_Services = "TypeAndServices";


  const handleSave = async (event) => {
    event.preventDefault();
    if (!userData.BusinessType || !userData.ModePayment || !userData.OwnershipType) {
      toast.error("Please fill in all the required fields.");
      return;
    }
    try {
      const db = getFirestore(app);

      const userCollectionRef = collection(db, "users");
      const userQuery = query(
        userCollectionRef,
        where("accessToken", "==", user_access_token)
      );
      const userQuerySnapshot = await getDocs(userQuery);
  
      if (!userQuerySnapshot.empty) {
        const loggedInUserDoc = userQuerySnapshot.docs[0];
        const loggedInUserData = loggedInUserDoc.data();
  
        
         const BusinessInformationObject = loggedInUserData.BusinessInformationObject || {};

       
         const TypeAndServices = String(Type_Services);
   
         BusinessInformationObject[TypeAndServices] = {
          BusinessType: userData.BusinessType,
        ModePayment: userData.ModePayment,
        OwnershipType: userData. OwnershipType,
        CompanyDescription: userData.CompanyDescription,
         };
   
        
         await updateDoc(loggedInUserDoc.ref, {
          BusinessInformationObject,
         });

        toast.success("Information saved successfully!");
      } else {
        toast.error("Logged-in user not found");
      }
    } catch (error) {
      console.error("Error adding Information:", error);
      toast.error("Failed to save Information. Please try again.");
    }
  };

  const MAX_COMPANY_DESCRIPTION_LENGTH = 2500;

  const CompanyDescriptionChangeHandler = (event) => {
    const description = event.target.value;
    if (description.length <= MAX_COMPANY_DESCRIPTION_LENGTH) {
      setUserData({ ...userData, CompanyDescription: description });
    } else {
      toast.error(`Company description should not exceed ${MAX_COMPANY_DESCRIPTION_LENGTH} characters.`);
    }
  };

  const BusinessTypeHandler = (event) => {
    setUserData({ ...userData, BusinessType: event.target.value });
  };
  const ModePaymentHandler = (event) => {
    setUserData({ ...userData, ModePayment: event.target.value });
  }; 
  const OwnershipTypeHandler = (event) => {
    setUserData({ ...userData, OwnershipType: event.target.value });
  }; 
  
 

  return (
    <>
      <div className="flex flex-col space-y-5 p-5 bg-white shadow-sm rounded-sm">
        <form onSubmit={handleSave} className="flex flex-col space-y-5">
          <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8">
            <div className="flex-1 flex-col space-y-3">
              <label className="font-semibold text-gray-700">
                Business Type
              </label>
              <select
                className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3 "
                onChange={BusinessTypeHandler}
                value={userData.BusinessType}
              >
                 <option className="" default>Select  </option>
                <option value="Product">Product</option>
                <option value="Service">Service</option>
              </select>
            </div>
            <div className="flex-1 flex-col space-y-3">
              <label className="font-semibold text-gray-700">
                Mode of Payment
              </label>
              <select className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
              onChange={ModePaymentHandler}
                value={userData.ModePayment}
              >  <option value="Monday">Select  </option>
                <option className=" " value="online">
                  Online
                </option>
                <option value="On Cash">On Cash</option>
              </select>
            </div>
            <div className="flex-1 flex-col space-y-3">
              <label className="font-semibold text-gray-700">
                Ownership Type
              </label>
              <select className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
              onChange={OwnershipTypeHandler}
                value={userData.OwnershipType}
              >  <option value="Monday">Select </option>
                <option className=" " value="Public Limited Company">
                  Public Limited Company
                </option>
                <option value="Private Limited Company"> Private Limited Company</option>
                <option value="Partnership">Partnership</option>
                <option value="Proprietorship">Proprietorship</option>
                <option value="Professional Associations">Professional Associations</option>
                <option value="Limited Liability Partnership">Limited Liability Partnership</option>

              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8">
            <div className="flex-1 flex-col space-y-3">
              <label className="font-semibold text-gray-700">
                Company Description
              </label>
              <textarea
                type="time"
                className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full p-3"  cols={50}
                rows={5}
                placeholder="*Limit is 2500 Characters*"  onChange={CompanyDescriptionChangeHandler}
                value={userData.CompanyDescription} required
              ></textarea>
            </div>
          </div>
          <div className="flex flex-row space-x-6">
            <button type="submit"
              className="bg-black px-8 py-2 rounded-lg text-1xl  font-semibold
    hover:bg-white hover:border-black hover:text-black border-2 text-white"
            >
              Save
            </button>
            {/* <button type="button" onClick={resetForm}
              className="bg-white px-8 py-2 rounded-lg text-1xl  font-semibold
    hover:bg-black border-black hover:text-white border-2 text-black"
            >
              Reset
            </button> */}
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
    </>
  );
};

export default withAuth(TypeAndServices);
