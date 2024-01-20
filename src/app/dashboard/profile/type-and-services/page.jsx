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
const TypeAndServices = () => {
  const [BusinessType, setBusinessType] = useState("");
  const [ModePayment, setModePayment] = useState("");
  const [StartDay, setStartDay] = useState("");
  const [EndDay, setEndDay] = useState("");
  const [OpenAt, setOpenAt] = useState("");
  const [CloseAt, setCloseAt] = useState(""); 
  const [CompanyDescription, setCompanyDescription] = useState(""); 
  const handleSave = async (event) => {
    event.preventDefault();
    if (!BusinessType || !ModePayment ) {
      toast.error("Please fill in all the required fields.");
      return;
    }
    const formData = {
      BusinessType: BusinessType,
      ModePayment: ModePayment,
      StartDay: StartDay,
      EndDay: EndDay,
      OpenAt: OpenAt,
      CloseAt: CloseAt,
      CompanyDescription: CompanyDescription,
      timestamp: serverTimestamp(),
    };

    try {
      const firestore = getFirestore(app);
      const userCollection = collection(firestore, "business_type");

      // Check if a document with the same phone number exists
      const userQuery = query(
        userCollection,
        where("CompanyDescription", "==", CompanyDescription)
      );
      const userQuerySnapshot = await getDocs(userQuery);

      if (!userQuerySnapshot.empty) {
        toast.error("User with the same phone number already exists.");
      } else {
        // Add a new document with the user details
        const newuserDoc = await addDoc(userCollection, formData);
        toast.success(
          "Added successfully " 
        );
      }
    } catch (error) {
      console.error("Error saving user details:", error);
      toast.error("Failed to save user details. Please try again.");
    }
  };
  const BusinessTypeHandler = (event) => {
    setBusinessType(event.target.value);
  };

  const ModePaymentHandler = (event) => {
    setModePayment(event.target.value);
  };
  const StartDayHandler = (event) => {
    setStartDay(event.target.value); // Update user role state
  };
  const EndDayHandler = (event) => {
    setEndDay(event.target.value);
  };
  const OpenAtChangeHandler = (event) => {
    setOpenAt(event.target.value);
  };

  const CloseAtChangeHandler = (event) => {
    setCloseAt(event.target.value);
  };
  const  CompanyDescriptionChangeHandler = (event) => {
    setCompanyDescription(event.target.value);
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
                Business Type
              </label>
              <select
                className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
                onChange={BusinessTypeHandler}
                value={BusinessType}
              >
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
                value={ModePayment}
              >
                <option className=" " value="online">
                  Online
                </option>
                <option value="On Cash">On Cash</option>
              </select>
            </div>
          </div>
          <label className="font-semibold text-gray-700">
            Working Days / Time
          </label>
          <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8">
            <div className="flex-1 flex-col space-y-3">
              <label className="font-semibold text-gray-700">
                Start day
              </label>
              <select className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"  
              onChange={StartDayHandler}
                value={StartDay} >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
            <div className="flex-1 flex-col space-y-3">
              <label className="font-semibold text-gray-700">End day</label>
              <select className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
              onChange={EndDayHandler}
                value={EndDay} >
                 <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8">
            <div className="flex-1 flex-col space-y-3">
              <label className="font-semibold text-gray-700">Open at</label>
              <input
                type="time"
                className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
                placeholder="" onChange={OpenAtChangeHandler}
                value={OpenAt} required
              />
            </div>
            <div className="flex-1 flex-col space-y-3">
              <label className="font-semibold text-gray-700">Close at</label>
              <input
                type="time"
                className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
                placeholder="" onChange={CloseAtChangeHandler}
                value={CloseAt} required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8">
            <div className="flex-1 flex-col space-y-3">
              <label className="font-semibold text-gray-700">
                Company Description
              </label>
              <textarea
                type="time"
                className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full p-3"
                placeholder="Type here"  onChange={CompanyDescriptionChangeHandler}
                value={CompanyDescription} required
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
            <button type="button" onClick={resetForm}
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

export default TypeAndServices;
