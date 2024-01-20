import Image from "next/image";
import React, { useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "../../app/firebase";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const AddUser = () => {
  const [userName, setuserName] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");
  const [emailAddress, setemailAddress] = useState("");
  const [userRole, setUserRole] = useState("");

  const handleSave = async (event) => {
    event.preventDefault();
    if (!userName || !mobileNumber || !emailAddress || !userRole) {
      toast.error("Please fill in all the required fields.");
      return;
    }
    const formData = {
      userName: userName,
      mobileNumber: mobileNumber,
      emailAddress: emailAddress,
      userRole: userRole,
      timestamp: serverTimestamp(),
    };

    try {
      const firestore = getFirestore(app);
      const userCollection = collection(firestore, "users");

      // Check if a document with the same phone number exists
      const userQuery = query(
        userCollection,
        where("mobileNumber", "==", mobileNumber)
      );
      const userQuerySnapshot = await getDocs(userQuery);

      if (!userQuerySnapshot.empty) {
        toast.error("User with the same phone number already exists.");
      } else {
        // Add a new document with the user details
        const newuserDoc = await addDoc(userCollection, formData);
        toast.success(
          "User added successfully with ID: " + newuserDoc.id.toString(2)
        );
      }
    } catch (error) {
      console.error("Error saving user details:", error);
      toast.error("Failed to save user details. Please try again.");
    }
  };
  const userNameChangeHandler = (event) => {
    setuserName(event.target.value);
  };

  const mobileNumberChangeHandler = (event) => {
    setmobileNumber(event.target.value);
  };
  const userRoleChangeHandler = (event) => {
    setUserRole(event.target.value); // Update user role state
  };
  const emailAddressChangeHandler = (event) => {
    setemailAddress(event.target.value);
  };

  return (
    <>
      <div className="flex flex-col space-y-5 p-5 bg-white shadow-sm rounded-sm">
        <h2 className="font-semibold text-2xl">Add User</h2>
        <form onSubmit={handleSave} className="flex flex-col space-y-5">
          <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8">
            <div className="flex-1 flex-col space-y-3">
              <label className="font-semibold text-gray-700">Name</label>
              <input
                type="text"
                className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
                placeholder="Type name here.."
                value={userName}
                onChange={userNameChangeHandler} required
              />
            </div>

            <div className="flex-1 flex-col space-y-3">
              <label className="font-semibold text-gray-700">
                Email emailAddress
              </label>
              <input
                type="email"
                className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
                placeholder="Type name here.."
                onChange={emailAddressChangeHandler}
                value={emailAddress} required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8">
            <div className="flex-1 flex-col space-y-3">
              <label className="font-semibold text-gray-700">
                Phone Number
              </label>
              <input
                type="number"
                className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
                placeholder="Type name here.."
                onChange={mobileNumberChangeHandler}
                value={mobileNumber} required
              />
            </div>

            <div className="flex-1 flex-col space-y-3">
              <label className="font-semibold text-gray-700">User Role</label>
              <select
                className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
                onChange={userRoleChangeHandler}
                value={userRole}
              >
                 <option default value="chooose">Choose</option>
                <option value="Manager">Manager</option>
                <option value="Partner">Partner</option>
                <option value="Assistant">Assistant</option>
              </select>
            </div>
          </div>
          
          <div className="flex flex-row space-x-6">
            <button
              type="submit"
              className="bg-black px-8 py-2 rounded-lg text-1xl  font-semibold
    hover:bg-white hover:border-black hover:text-black border-2 text-white"
            >
              Add
            </button>
            <button
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

export default AddUser;
