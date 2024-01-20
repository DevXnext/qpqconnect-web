"use client";
import React, { useState } from "react";
import Select from "react-select";
import { getFirestore, collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { app } from "../../app/firebase";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
const ProfileBusinessForm = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

const handleSave = async () => {
  const formData = {
    companyName: companyName,
    phoneNumber: phoneNumber,
    address: address,
    country: selectedCountry ? selectedCountry.label : "",
    state: selectedState ? selectedState.label : "",
    city: selectedCity ? selectedCity.label : "",
    timestamp: serverTimestamp(),
  };

  try {
    const firestore = getFirestore(app);
    const businessCollection = collection(firestore, 'business_information');

    // Check if a document with the same phone number exists
    const businessQuery = query(businessCollection, where('phoneNumber', '==', phoneNumber));
    const businessQuerySnapshot = await getDocs(businessQuery);

    if (!businessQuerySnapshot.empty) {
      toast.error("Business with the same phone number already exists.");
    } else {
      // Add a new document with the business details
      const newBusinessDoc = await addDoc(businessCollection, formData);
      toast.success("Business details saved successfully with ID: " + newBusinessDoc.id.toString(0,2));
    }
  } catch (error) {
    console.error("Error saving business details:", error);
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
    { value: "Toronto", label: "Toronto", country: "ca" },

  ];

  const cityOptions = [
    {
      value: "los_angeles",
      label: "Los Angeles",
      state: "california",

    },
    { value: "dubai", label: "Dubai", state: "dubai" },
    { value: "Quebec", label: "Quebec", state: "Toronto" },
    { value: "Montreal", label: "Montreal", state: "Toronto" },


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
  const resetForm = () => {
    setBusinessNumber("");
    setIssueDate("");
  };
  return (
    <>
    
      <div className="flex flex-col space-y-5 p-5 bg-white shadow-sm rounded-sm">
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
            <input
              type="number"
              className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
              placeholder="Type phone number here.."
              name="phoneNumber"
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
