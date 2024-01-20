"use client";
import React, { useState, useEffect, useRef } from "react";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "../../../firebase";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const TaxInformation = () => {
  const [BusinessNumber, setBusinessNumber] = useState("");
  const [IssueDate, setIssueDate] = useState("");
  const handleSave = async (event) => {
    event.preventDefault();
    if (!BusinessNumber || !IssueDate) {
      toast.error("Please fill in all the required fields.");
      return;
    }
    const formData = {
      BusinessNumber: BusinessNumber,
      IssueDate: IssueDate,

      timestamp: serverTimestamp(),
    };

    try {
      const firestore = getFirestore(app);
      const userCollection = collection(firestore, "tax_information");

      // Check if a document with the same phone number exists
      const userQuery = query(
        userCollection,
        where("BusinessNumber", "==",  BusinessNumber)
      );
      const userQuerySnapshot = await getDocs(userQuery);

      if (!userQuerySnapshot.empty) {
        toast.error("Company with the Same Business Number Already Exists.");
      } else {
        // Add a new document with the user details
        const newuserDoc = await addDoc(userCollection, formData);
        toast.success("Tax Information Added successfully ");
      }
    } catch (error) {
      console.error("Error saving user details:", error);
      toast.error("Failed to save user details. Please try again.");
    }
  };
  const BusinessNumberChangeHandler = (event) => {
    setBusinessNumber(event.target.value);
  };

  const IssueDateChangeHandler = (event) => {
    setIssueDate(event.target.value);
  };
  const resetForm = () => {
    setBusinessNumber("");
    setIssueDate("");
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
                placeholder="Type name here.."
                onChange={BusinessNumberChangeHandler}
                value={BusinessNumber}
                required
              />
            </div>

            <div className="flex-1 flex-col space-y-3">
              <label className="font-semibold text-gray-700">Issue Date</label>
              <input
                type="date"
                className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
                onChange={IssueDateChangeHandler}
                value={IssueDate}
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
            <button  type="button" // Use type="button" to prevent form submission
              onClick={resetForm}
              className="bg-white px-8 py-2 rounded-lg text-1xl  font-semibold
    hover:bg-black border-black hover:text-white border-2 text-black"
            >
              Reset
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

export default TaxInformation;
