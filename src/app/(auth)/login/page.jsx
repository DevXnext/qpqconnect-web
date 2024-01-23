"use client";
import { app } from "../../firebase";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import cookie from "js-cookie";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
const Login = () => {
  const firestore = getFirestore(app);
  const router = useRouter();
  const auth = getAuth(app);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [user, setUser] = useState(null);
  const [Otp, setOtp] = useState("");
  const [verificationStep, setVerificationStep] = useState("phone");
  const [isLoggedIn, setLoggedIn] = useState(false);
 
  useEffect(() => {
    // Get the mobileNumber parameter from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const mobileNumberParam = queryParams.get("mobileNumber");
  
    if (mobileNumberParam) {
      // Decode the URL-encoded mobile number and set it in the state
      const decodedMobileNumber =  decodeURIComponent(mobileNumberParam);
      setPhoneNumber("+" + decodedMobileNumber.trim());
  
      // Print a test message in the console
      console.log("Mobile Number:",phoneNumber);
    } else {
      // If mobileNumberParam is null, print an error message
      console.error("Mobile Number not found in URL parameters");
    }
  }, []);
  
  const sentOtp = async () => {
    try {
      const userCollection = collection(firestore, "users");
      // console.log("Querying for mobile number:", phoneNumber);
      const userQuery = query(
        userCollection,
        where("mobileNumber", "==",  phoneNumber)
      );
      const userQuerySnapshot = await getDocs(userQuery);

      if (!userQuerySnapshot.empty) {
        const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
        const confirmation = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          recaptcha
        );
        setUser(confirmation);
        setVerificationStep("otp");
        toast.success("OTP Sent successfully");
      } else {
        toast.error("Mobile number not registered. Please register with us.");
       
      }
    } catch (err) {
      toast.error("Failed to send OTP. Please try again.");
      console.error(err);
    }
  };

  
  const verify = async () => {
    try {
      const userCredential = await user.confirm(Otp);
      const accessToken = userCredential.user.accessToken;
      console.log("Verifed", userCredential);
      toast.success("OTP is Verified");
      setLoggedIn(true);
      setUser({ ...user, accessToken });
    } catch (err) {
      console.error(err);
      toast.error("Failed to verified OTP is unvalid. Please try again.");
    }
  };
  useEffect(() => {
    const handleLogin = async () => {
      if (isLoggedIn && user) {
        cookie.set("access_token", user.accessToken, { expires: 2 }); // Adjust the expiration as needed
       
        const userCollection = collection(firestore, "users");
        // console.log("Login - ",userCollection)
        const userQuery = query(userCollection, where("mobileNumber", "==", phoneNumber));
        const userQuerySnapshot = await getDocs(userQuery);
       
        if (!userQuerySnapshot.empty) {
          const userData = userQuerySnapshot.docs[0].data();
          if (userData.accessToken) {
            cookie.set("user_access_token", userData.accessToken, { expires: 2 });
          }
          // console.log(userData)
        }
        router.push("/dashboard");
      }
    };

    handleLogin();
  }, [isLoggedIn, router, user, phoneNumber]);


  return (
    <>
      <div className="flex flex-row h-screen w-full lg:flex-row">
        <div className="lg:w-1/4 hidden lg:flex">
          <Image
            src="/register-back.png"
            width={1000}
            height={1000}
            alt=""
            className="w-full h-full rounded-r-[50px] object-center"
          />
        </div>

        <div className="lg:w-3/4 flex flex-col w-full ">
          {/* Logo Section */}
          <div className="w-full mt-4 lg:w-1/4 flex lg:items-left items-center lg:justify-start justify-center">
            <Image
              src="/logo/q-black.svg"
              width={75}
              height={75}
              alt=""
              className="ml-6"
            />
          </div>
          <div className="w-full h-full flex items-center justify-center ">
            <div className="flex flex-col space-y-5 shadow-lg rounded-md w-full m-10 lg:m-0 lg:w-[500px] hover:shadow-gray-200 bg-white border border-gray-200 p-10">
              <div className="flex flex-col space-y-2">
                <p className="text-2xl font-semibold">Login</p>
                <span className="text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </span>
              </div>

              <div className="flex flex-col space-y-3">
                {verificationStep === "phone" && (
                  <>
                    <div id="recaptcha"></div>
                    <div className="flex flex-col space-y-3 ">
                      <label className="text-1xl font-semibold">
                        Mobile Number
                      </label>

                      <div className="">
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
                          onChange={(phoneNumber) => 
                            setPhoneNumber("+" + phoneNumber)   
                          }  
                        />
                      </div>
                    </div>

                    <div className="flex py-5 flex-col space-y-5">
                      {/* <Link href="./otp-verification"> */}
                      <button
                        onClick={sentOtp}
                        className="text-center bg-black w-full text-white p-3 rounded-lg hover:bg-gray-800"
                      >
                        Send OTP
                      </button>
                      {/* </Link> */}
                      <Link
                        href="/email"
                        className="text-base text-gray-400 hover:text-gray-800 cursor-pointer"
                      >
                        Login with Email
                      </Link>
                      <Link
                        href="./register/"
                        className="text-base text-gray-600 hover:text-gray-800 cursor-pointer text-center"
                      >
                        Dont have an account? Register with us
                      </Link>
                    </div>
                  </>
                )}
                {/* Verified OTP */}
                {verificationStep === "otp" && (
                  <div className="flex flex-col space-y-3">
                    <div className="flex flex-col space-y-3 ">
                      <label className="text-1xl font-semibold">
                        Verfication Code
                      </label>
                      <input
                        type="number"
                        name=""
                        className="border border-gray-300 rounded-md h-12 p-3"
                        placeholder="Enter otp here"
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </div>

                    <div className="flex py-5 flex-col space-y-5">
                      <button
                        onClick={verify}
                        className="text-center bg-black w-full text-white p-3 rounded-lg hover:bg-gray-800"
                      >
                        Verify
                      </button>

                      <Link
                        href="./register"
                        className="text-base text-gray-600 hover:text-gray-800 cursor-pointer text-center"
                      >
                        Don&#39;t have account? Register with us
                      </Link>
                    </div>
                  </div>
                )}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
