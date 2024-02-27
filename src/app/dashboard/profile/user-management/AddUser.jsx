import Image from "next/image";
import React, { useState } from "react";
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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const AddUser = () => {
  const cookies = parseCookies();
  const user_access_token = cookies.user_access_token;

  const [userName, setuserName] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");
  const [emailAddress, setemailAddress] = useState("");
  const [userRole, setUserRole] = useState("");

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
  const handleSave = async (event) => {
    event.preventDefault();

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

        if (
          Array.isArray(loggedInUserData.otherusers) &&
          loggedInUserData.otherusers.length >= 2
        ) {
          toast.error("You have reached the limit of adding other users.");
          return;
        }
        // Check if the user with the same email already exists
        const userAlreadyExists =
          Array.isArray(loggedInUserData.otherusers) &&
          loggedInUserData.otherusers.some(
            (user) => user.emailAddress === emailAddress
          );

        if (userAlreadyExists) {
          toast.error("User with this email already exists.");
          return;
        }
        const otherUsersArray = Array.isArray(loggedInUserData.otherusers)
          ? loggedInUserData.otherusers
          : [];

        // Step 3: Add the new user's information to the otherusers array
        const updatedOtherUsers = [
          ...otherUsersArray,
          {
            userName,
            mobileNumber,
            emailAddress,
            userRole,
          },
        ];

        // Step 4: Save the updated document back to the user collection
        await updateDoc(loggedInUserDoc.ref, { otherusers: updatedOtherUsers });

        toast.success("User added successfully!");
      } else {
        toast.error("Logged-in user not found");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to add user. Please try again.");
    }
  };
  return (
    <>
      <div className="flex flex-col space-y-5 p-5 bg-white shadow-sm rounded-sm ">
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
                onChange={userNameChangeHandler}
                required
              />
            </div>

            <div className="flex-1 flex-col space-y-3">
              <label className="font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
                placeholder="Type name here.."
                onChange={emailAddressChangeHandler}
                value={emailAddress}
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8">
            <div className="flex-1 flex-col space-y-3">
              <label className="font-semibold text-gray-700">
                Phone Number
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
                onChange={(mobileNumber) => setmobileNumber("+" + mobileNumber)}
              />
            </div>

            <div className="flex-1 flex-col space-y-3">
              <label className="font-semibold text-gray-700">User Role</label>
              <select
                className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
                onChange={userRoleChangeHandler}
                value={userRole}
              >
                <option default value="chooose">
                  Choose
                </option>
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
    </>
  );
};

export default AddUser;
