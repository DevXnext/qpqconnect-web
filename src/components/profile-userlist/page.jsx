import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
  query,
} from "firebase/firestore";
import { app } from "../../app/firebase";
import { parseCookies } from "nookies";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
const UserListing = () => {
  const SkeletonLoader = () => (
    <tr className="border-b border-blue-gray-200 animate-pulse">
      <td className="py-2 px-3">
        <div className="h-2 bg-slate-700 rounded"></div>
      </td>
      <td className="py-2 px-3">
        <div className="h-2 bg-slate-600 rounded"></div>
      </td>
      <td className="py-2 px-3">
        <div className="h-2 bg-slate-600 rounded"></div>
      </td>
      <td className="py-2 px-3">
        <div className="h-2 bg-slate-600 rounded"></div>
      </td>
      <td className="py-2 px-3">
        <div className="h-2 bg-slate-600 rounded"></div>
      </td>
    </tr>
  );
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [otherUsers, setOtherUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const cookies = parseCookies();
  const user_access_token = cookies.user_access_token;
  


  useEffect(() => {
    const db = getFirestore(app);
    const usersCollectionRef = collection(db, "users");

    const unsubscribe = onSnapshot(
      query(usersCollectionRef),
      (snapshot) => {
        const userData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Find the logged-in user based on the accessToken
        const user = userData.find((user) => user.accessToken === user_access_token);

        if (user) {
          // Set the logged-in user in the state
          setLoggedInUser(user);

          // Access the 'otherusers' array from the logged-in user's data
          const otherUsersArray = user.otherusers || [];
          setOtherUsers(otherUsersArray);
        }

        setLoading(false);
      },
      (error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    );

    return () => {
      // Unsubscribe from the listener when the component unmounts
      unsubscribe();
    };
  }, [user_access_token]);

  const handleDeleteUser = async (userId) => {
    try {
      const db = getFirestore(app);
      const userDocRef = doc(db, "users", loggedInUser.id);

      // Find the index of the user to be deleted in the 'otherusers' array
      const userIndex = loggedInUser.otherusers.findIndex(
        (user) => user.id === userId
      );

      if (userIndex !== -1) {
        // Create a new array without the user to be deleted
        const updatedOtherUsers = [
          ...loggedInUser.otherusers.slice(0, userIndex),
          ...loggedInUser.otherusers.slice(userIndex + 1),
        ];

        // Update the 'otherusers' array in the user document
        await updateDoc(userDocRef, { otherusers: updatedOtherUsers });

        // Update the state with the modified 'otherusers' array
        setOtherUsers(updatedOtherUsers);
        toast.success("User deleted successfull.");
      }
    } catch (error) {
      toast.error("Unable to delete user. Please try again later");
      console.error("Error deleting user:", error);
    }
  };
  return (
    <>
      <div className="border w-full h-fit rounded-md hover:shadow-xl shadow flex justify-center flex-col space-y-3 p-5">
        <div className="flex flex-row justify-between items-center border-b-2 pb-2">
          <h2 className="text-lg font-semibold">User Listing</h2>
        </div>
        <div className="overflow-x-auto shadow-md p-3 rounded-xl">
       
          <table className="min-w-full">
            <thead>
              <tr className="bg-blue-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">S.no.</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email address</th>
                <th className="py-3 px-4 text-left">Phone Number</th>
                <th className="py-3 px-4 text-left">User Role</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-blue-gray-900">
            {loading ? (
            // Display loading skeleton or spinner while data is being fetched
            <SkeletonLoader />
          )  : otherUsers.length > 0 ? (
            otherUsers.map((user, index) => (

              <tr key={user.id} className="border-b border-blue-gray-200">
                <td className="py-3 px-4"> {index + 1}</td>
                <td className="py-3 px-4 font-semibold text-blue-800">
                {user.userName}
                </td>
                <td className="py-3 px-4 font-semibold"> {user.emailAddress}</td>
                <td className="py-3 px-4">{user.mobileNumber}</td>
                <td className="py-3 px-4">{user.userRole}</td>

                <td className="py-3 px-4 flex flex-row space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-red-500" onClick={() => handleDeleteUser(user.id)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </td>
              </tr>
                    ))
                    ) : (
                      <tr>
                      <td
                        colSpan="9"
                        className="py-3 px-4 text-xl font-semibold text-center"
                      >
                        No Users Found..
                      </td>
                    </tr>
              )}
            </tbody>    
          </table>
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
    </>
  );
};

export default UserListing;
