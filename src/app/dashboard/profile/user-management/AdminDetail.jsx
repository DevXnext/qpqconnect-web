import Image from "next/image";
import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../../firebase";
// import cookie from "js-cookie";
import { parseCookies } from "nookies";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const AdminDetails = () => {
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userName, setuserName] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");
  const [emailAddress, setemailAddress] = useState("");
  const storage = getStorage();
  const [selectedLogo, setSelectedLogo] = useState(null); 
  const [fetchedLogo, setFetchedLogo] = useState(null);

  const cookies = parseCookies();
  const user_access_token = cookies.user_access_token;
  useEffect(() => {
    const fetchLogo = async () => {
      if (user_access_token) {
        const storageRef = ref(storage, `companyImages/${user_access_token}`);
        const filename = "companyLogo.png";
        const imageRef = ref(storageRef, filename);

        try {
          const downloadURL = await getDownloadURL(imageRef);
          setFetchedLogo(downloadURL);
        } catch (error) {
          // Handle error, for example, set a default logo
          console.error("Error fetching logo:", error);
          setSelectedLogo("/profile.png");
        }
      }
    };

    fetchLogo();
  }, [user_access_token, storage]);
  
  // const handleLogoChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setSelectedLogo(file);
  //   }
  // };
  // const handleLogoChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setSelectedLogo(file);
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       // Use the result property to access the data URL
  //       setFetchedLogo(reader.result);
  //     };
  //     // Read the file as a data URL
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setSelectedLogo(file);
    // Update the fetchedLogo state with the data URL
    setFetchedLogo(URL.createObjectURL(file));
  };
  useEffect(() => {
    const cookies = parseCookies();

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
            setmobileNumber(userData.mobileNumber || "");
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
        mobileNumber: mobileNumber,
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
            mobileNumber: mobileNumber,
          },
          { merge: true }
        );
      
        if (selectedLogo && user_access_token) {
          const storageRef = ref(storage, `companyImages/${user_access_token}`);
          const filename = "companyLogo.png";
          const imageRef = ref(storageRef, filename);
  
          await uploadBytes(imageRef, selectedLogo);
          const downloadURL = await getDownloadURL(imageRef);
  
          // Use the downloadURL as needed (e.g., save it to a database)
          console.log('Logo uploaded, Download URL:', downloadURL);
  
          // Now you can update your state or perform other actions with the downloadURL
        }
        await setDoc(userDocRef, formData, { merge: true });

        toast.success("Admin details saved successfully");
      } else {
        toast.error("User not found");
      }
    } catch (error) {
      console.error("Error updating Admin details:", error);
      console.error('Error uploading logo:', error);
      toast.error("Failed to save Admin details. Please try again.");
    }
  };
  const userNameChangeHandler = (event) => {
    setuserName(event.target.value);
  };
  
  const mobileNumberChangeHandler = (event) => {
    setmobileNumber(event.target.value);
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
              
                {/* <input
                  type="text"
                  className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
                  placeholder="Type name here.."
                  value={mobileNumber} onChange={mobileNumberChangeHandler}
                /> */}
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
                      onChange={(mobileNumber) =>
                        setmobileNumber("+" + mobileNumber)
                      }
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
            <div className="relative w-48 h-48">
            <label htmlFor="logoInput" className="cursor-pointer">
              <Image
                src="/camera.svg"
                width={40}
                height={40}
                alt="camera"
                className="absolute top-44 left-20 bg-white p-1 rounded-full "
              />
              {/* <Image
             src={selectedLogo 
              ? URL.createObjectURL(selectedLogo)
              : fetchedLogo || "/profile.png"}

                width={200}
                height={200}
                alt="profile"
                className="border rounded-full w-full h-full p-2"
              /> */}
              <Image
                  src={fetchedLogo || "/profile.png"}
                  width={200}
                  height={200}
                  alt="profile"
                  className="border rounded-full w-full h-full p-2"
                />
              </label>
               <input
          type="file"
          id="logoInput"
          accept="image/*"
          className="hidden"
          onChange={handleLogoChange}
        />
            </div>
            <div>
              <p>Company Logo</p>
            </div>
            <div className="flex flex-row space-x-6">
              <button   onClick={handleSave}
                className="bg-black px-8 py-2 rounded-lg text-1xl  font-semibold
    hover:bg-white hover:border-black hover:text-black border-2 text-white"
              >
                Save
              </button>
            
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
    </>
  );
};

export default AdminDetails;
