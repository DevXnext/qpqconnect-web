import Image from "next/image";
import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "../../app/firebase";
import cookie from "js-cookie";
import { parseCookies } from "nookies";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
const AdminDetails = () => {
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userName, setuserName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [emailAddress, setemailAddress] = useState("");


  useEffect(() => {
    const cookies = parseCookies();

    // Retrieve the access_token from cookies
    const user_access_token = cookies.user_access_token;
    if (user_access_token) {
      const fetchLatestUserData = async () => {
        try {
          const userCollectionRef = collection(getFirestore(app), "users");
          const userQuery = query(
            userCollectionRef,
            where("accessToken", "==", user_access_token)
          );
          const userQuerySnapshot = await getDocs(userQuery);

          // console.log("User Query Snapshot:", userQuerySnapshot);

          if (!userQuerySnapshot.empty) {
            // Found the latest user, extract user data
            const loggedInUserDoc = userQuerySnapshot.docs[0];
            // setLoggedInUserData(loggedInUserDoc.data());
            // console.log(loggedInUserDoc.data());
            const userData = loggedInUserDoc.data();

            // Update the state with user data
            setLoggedInUserData(userData);

            // Set default values for input fields
            setuserName(userData.userName || "");
            setphoneNumber(userData.mobileNumber || "");
            setemailAddress(userData.emailAddress || "");
           
          } else {
            console.log("No users found");
          }
        } catch (error) {
          console.error("Error fetching  user data:", error);
        }
      };
      fetchLatestUserData();
    } else {
      // Handle the case where access_token is not available
      console.log("Access token not available");
    }
  }, []);

  const handleSave = async () => {
    try {
      const formData = {
        userName: userName,
        phoneNumber: phoneNumber,
        emailAddress: emailAddress,
        timestamp: serverTimestamp(),
      };

      const userCollectionRef = collection(getFirestore(app), "users");
      const userQuery = query(
        userCollectionRef,
        where("accessToken", "==", loggedInUserData.accessToken)
      );
      const userQuerySnapshot = await getDocs(userQuery);

      if (!userQuerySnapshot.empty) {
        const userDocRef = doc(
          getFirestore(app),
          "users",
          userQuerySnapshot.docs[0].id
        );

        // Update the companyName and phoneNumber fields
        await setDoc(
          userDocRef,
          {
            userName: userName,
            phoneNumber: phoneNumber,
          },
          { merge: true }
        );

        // Update the other fields
        await setDoc(userDocRef, formData, { merge: true });

        toast.success("Admin details saved successfully");
      } else {
        toast.error("User not found");
      }
    } catch (error) {
      console.error("Error updating Admin details:", error);
      toast.error("Failed to save Admin details. Please try again.");
    }
  };
  const userNameChangeHandler = (event) => {
    setuserName(event.target.value);
  };
  
  const phoneNumberChangeHandler = (event) => {
    setphoneNumber(event.target.value);
  };

  const emailAddressChangeHandler = (event) => {
    setemailAddress(event.target.value);
  };
  return (
    <>
      <div className="flex flex-col space-y-5 p-5 bg-white shadow-sm rounded-sm ">
        <h2 className="font-semibold text-2xl">Admin Details</h2>
        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8">
          <div className="basis-[70%]  flex flex-col space-y-5 ">
            <div className="flex-1 flex-col space-y-3">
              <label className="font-semibold text-gray-700">User Name</label>
              <input
                type="text"
                className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
                placeholder="Type name here.." value={userName}  onChange={userNameChangeHandler}
              />
            </div>
            <div className="flex-1 flex-col space-y-3">
              <label className="font-semibold text-gray-700">
                Phone Number
              </label>
              
                <input
                  type="text"
                  className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
                  placeholder="Type name here.."
                  value={phoneNumber} onChange={phoneNumberChangeHandler}
                />
              
            </div>

            <div className="flex-1 flex-col space-y-3">
              <label className="font-semibold text-gray-700">
                Email Address
              </label>
             
                <input
                  type="text"
                  className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
                  placeholder="Type name here.."
                  value={emailAddress} onChange={emailAddressChangeHandler} 
                />
              
            </div>
          </div>
          <div className="basis-[30%] flex flex-col space-y-5 justify-center w-full items-center relative">
            <div className="relative">
              <Image
                src="/camera.svg"
                width={40}
                height={40}
                alt="camera"
                className="absolute top-44 left-20 bg-white p-1 rounded-full "
              />
              <Image
                src="/profile.svg"
                width={200}
                height={200}
                alt="profile"
                className="border rounded-full p-2"
              />
            </div>
            <div>
              <p>Profile Picture</p>
            </div>
            <div className="flex flex-row space-x-6">
              <button   onClick={handleSave}
                className="bg-black px-8 py-2 rounded-lg text-1xl  font-semibold
    hover:bg-white hover:border-black hover:text-black border-2 text-white"
              >
                Save
              </button>
              {/* <button
                className="bg-white px-8 py-2 rounded-lg text-1xl  font-semibold
    hover:bg-black border-black hover:text-white border-2 text-black"
              >
                Reset
              </button> */}
            </div>
          </div>
        </div>
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

export default AdminDetails;
