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
const TaxInformation = () => {
  const cookies = parseCookies();
  const user_access_token = cookies.user_access_token;

  const [userData, setUserData] = useState({
    BusinessNumber: "",
    IssueDate: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore(app);

        // Query the user collection to find the document of the logged-in user
        const userCollectionRef = collection(db, "users");
        const userQuery = query(
          userCollectionRef,
          where("accessToken", "==", user_access_token)
        );
        const userQuerySnapshot = await getDocs(userQuery);

        if (!userQuerySnapshot.empty) {
          const loggedInUserDoc = userQuerySnapshot.docs[0];
          const loggedInUserData = loggedInUserDoc.data();

          // Set the state with the fetched data
          setUserData({
            BusinessNumber:
              loggedInUserData.BusinessInformationObject?.TaxInformation
                ?.BusinessNumber || "",
            IssueDate:
              loggedInUserData.BusinessInformationObject?.TaxInformation?.IssueDate || "",
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

  const handleSave = async (event) => {
    event.preventDefault();
    if (!userData.BusinessNumber || !userData.IssueDate) {
      toast.error("Please fill in all the required fields.");
      return;
    }
    try {
      const db = getFirestore(app);

      // Step 1: Query the user collection to find the document of the logged-in user
      const userCollectionRef = collection(db, "users");
      const userQuery = query(
        userCollectionRef,
        where("accessToken", "==", user_access_token)
      );
      const userQuerySnapshot = await getDocs(userQuery);

      if (!userQuerySnapshot.empty) {
        const loggedInUserDoc = userQuerySnapshot.docs[0];
        const loggedInUserData = loggedInUserDoc.data();

        const BusinessInformationObject =
          loggedInUserData.BusinessInformationObject || {};

        const TypeAndServices = String(Tax_Information);

        BusinessInformationObject[TypeAndServices] = {
          BusinessNumber: userData.BusinessNumber,
          IssueDate: userData.IssueDate,
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
  const Tax_Information = "TaxInformation";

  const BusinessNumberHandler = (event) => {
    setUserData({ ...userData, BusinessNumber: event.target.value });
  };
  const IssueDateHandler = (event) => {
    setUserData({ ...userData, IssueDate: event.target.value });
  };

  return (
    <>
      <div className="flex flex-col space-y-5 p-5 bg-white shadow-sm rounded-sm">
        <form onSubmit={handleSave} className="flex flex-col space-y-5">
          <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8">
            <div className="flex-1 flex-col space-y-3">
              <label className="font-semibold text-gray-700">
                Business Number
              </label>
              <input
                type="text"
                className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
                placeholder="Type number here.."
                onChange={BusinessNumberHandler}
                value={userData.BusinessNumber}
                required
              />
            </div>

            <div className="flex-1 flex-col space-y-3">
              <label className="font-semibold text-gray-700">Issue Date</label>
              <input
                type="date"
                className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
                onChange={IssueDateHandler}
                value={userData.IssueDate}
                required
              />
            </div>
          </div>

          <div className="flex flex-row space-x-6">
            <button
              type="submit"
              className="bg-black px-8 py-2 rounded-lg text-1xl  font-semibold
    hover:bg-white hover:border-black hover:text-black border-2 text-white"
            >
              Save
            </button>
           
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

export default withAuth(TaxInformation);
