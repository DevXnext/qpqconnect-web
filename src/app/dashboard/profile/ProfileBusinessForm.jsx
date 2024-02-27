"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
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
import { app } from "../../firebase";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { parseCookies } from "nookies";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ProfileBusinessForm = () => {
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

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
            setCompanyName(userData.companyName || "");
            setPhoneNumber(userData.mobileNumber || "");
            setAddress(userData.address || "");
            setSelectedCountry(
              userData.country
                ? { label: userData.country, value: userData.country }
                : null
            );
            setSelectedState(
              userData.state
                ? {
                    label: userData.state,
                    value: userData.state,
                    country: userData.country,
                  }
                : null
            );
            setSelectedCity(
              userData.city
                ? {
                    label: userData.city,
                    value: userData.city,
                    state: userData.state,
                  }
                : null
            );
          } else {
            console.log("No users found");
          }
        } catch (error) {
          console.error("Error fetching latest user data:", error);
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
        companyName: companyName,
        phoneNumber: phoneNumber,
        address: address,
        country: selectedCountry ? selectedCountry.label : "",
        state: selectedState ? selectedState.label : "",
        city: selectedCity ? selectedCity.label : "",
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
            companyName: companyName,
            phoneNumber: phoneNumber,
          },
          { merge: true }
        );

        // Update the other fields
        await setDoc(userDocRef, formData, { merge: true });

        toast.success("Business details saved successfully");
      } else {
        toast.error("User not found");
      }
    } catch (error) {
      console.error("Error updating business details:", error);
      toast.error("Failed to save business details. Please try again.");
    }
  };
  const countryOptions = [
    { value: "usa", label: "United States of America" },
    { value: "uae", label: "United Arab Emirates" },
    { value: "ca", label: "Canada" },
  ];

  const stateOptions = [
    { value: "california", label: "California", country: "usa" },
    { value: "dubai", label: "Dubai", country: "uae" },
    { value: "ontario", label: "Ontario", country: "ca" },
  ];

  const cityOptions = [
    {
      value: "los_angeles",
      label: "Los Angeles",
      state: "california",
    },
    { value: "dubai", label: "Dubai", state: "dubai" },
    { value: "Quebec", label: "Quebec", state: "dubai" },
    { value: "Montreal", label: "Montreal", state: "dubai" },

    { value: "toronto", label: "Toronto", state: "ontario" },


  ];

  const companyNameChangeHandler = (event) => {
    setCompanyName(event.target.value);
  };

  const phoneNumberChangeHandler = (event) => {
    setPhoneNumber(event.target.value);
  };

  const addressChangeHandler = (event) => {
    setAddress(event.target.value);
  };

  const countryChangeHandler = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setSelectedState(null);
    setSelectedCity(null);
  };

  const stateChangeHandler = (selectedOption) => {
    setSelectedState(selectedOption);
    setSelectedCity(null);
  };

  const cityChangeHandler = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const filteredStateOptions = stateOptions.filter(
    (state) => !selectedCountry || state.country === selectedCountry.value
  );

  const filteredCityOptions = cityOptions.filter(
    (city) => !selectedState || city.state === selectedState.value
  );

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      height: "44px",
      border: state.isFocused ? "1px solid #000" : "1px solid #ccc",
      backgroundColor: "rgb(249 250 251 / var(--tw-bg-opacity))",
      borderRadius: "6px",
    }),
  };

  return (
    <>
      <div className="flex flex-col space-y-5 p-5 bg-white hover:shadow-xl shadow-sm rounded-md">
        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8">
          <div className="flex-1 flex-col space-y-3">
            <label className="font-semibold text-gray-700">Company Name</label>

            <input
              type="text"
              className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
              placeholder="Type name here.."
              name="companyName"
              value={companyName}
              onChange={companyNameChangeHandler}
            />
          </div>

          <div className="flex-1  flex-col space-y-3">
            <label className="font-semibold text-gray-700">Phone Number</label>

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
              value={phoneNumber}
              onChange={phoneNumberChangeHandler}
            />
          </div>

          <div className="flex-1  flex-col space-y-3">
            <label className="font-semibold text-gray-700">Address</label>
            <textarea
              type="address"
              className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full p-3"
              placeholder="Type address here.."
              name="address"
              value={address}
              onChange={addressChangeHandler}
            ></textarea>
          </div>
        </div>

        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8">
          <div className="flex-1 flex-col space-y-3 relative">
            <label className="font-semibold text-gray-700">Country</label>
            <Select
              options={countryOptions}
              value={selectedCountry}
              onChange={countryChangeHandler}
              placeholder="Select country..."
              styles={customStyles}
            />
          </div>

          {/* State Autocomplete */}
          <div className="flex-1  flex-col space-y-3">
            <label className="font-semibold text-gray-700">
              Province / State
            </label>
            <Select
              options={filteredStateOptions}
              value={selectedState}
              onChange={stateChangeHandler}
              placeholder="Select state..."
              styles={customStyles}
            />
          </div>

          <div className="flex-1  flex-col space-y-3">
            <label className="font-semibold text-gray-700">City</label>
            <Select
              options={filteredCityOptions}
              value={selectedCity}
              onChange={cityChangeHandler}
              placeholder="Select city..."
              styles={customStyles}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8"></div>
        <div className="flex flex-row space-x-6">
          <button
            onClick={handleSave}
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

export default ProfileBusinessForm;
