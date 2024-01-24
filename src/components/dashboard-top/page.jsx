import Image from "next/image";
import { useEffect, useState } from "react";
import { getFirestore, collection,  query, where,  getDocs } from "firebase/firestore";
import { app } from "../../app/firebase";
import { parseCookies } from 'nookies';
import Link from "next/link";

const DashboardTop = ({ access_token }) => {
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [memberSince, setMemberSince] = useState(null);
  useEffect(() => {
    const cookies = parseCookies();

    // Retrieve the access_token from cookies
    const user_access_token = cookies.user_access_token;
    if (user_access_token) {
    const fetchLatestUserData = async () => {
      try {
        const userCollectionRef = collection(getFirestore(app), "users");
        const userQuery = query(userCollectionRef, where('accessToken', '==', user_access_token));
        const userQuerySnapshot = await getDocs(userQuery);

        // console.log("User Query Snapshot:", userQuerySnapshot);

        
        if (!userQuerySnapshot.empty) {
          // Found the latest user, extract user data
          const loggedInUserDoc = userQuerySnapshot.docs[0];
          setLoggedInUserData(loggedInUserDoc.data());
          // console.log(loggedInUserDoc.data());
          const registrationTimestamp = loggedInUserDoc.data().timestamp.toMillis();
          const currentDate = new Date().getTime();
          const timeDiff = currentDate - registrationTimestamp;
          
          // Convert time difference to days, hours, and minutes
          const days = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
          const hours = Math.floor((timeDiff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
          const minutes = Math.floor((timeDiff % (60 * 60 * 1000)) / (60 * 1000));

          setMemberSince({ days, hours, minutes });
        } else {
          console.log("No users found");
        }
      } catch (error) {
        console.error("Error fetching latest user data:", error);
      }
    };
    fetchLatestUserData();
  }
  else {
    // Handle the case where access_token is not available
    console.log("Access token not available");
  }
  }, []);


  return (
    <>
        
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="shadow-md bg-white w-full lg:w-96 h-auto lg:h-68 flex flex-col 
        justify-center space-y-5 rounded-md p-5 hover:shadow-xl">
          <p className="font-medium">Company Details</p>
          <div className="space-y-2">
          {loggedInUserData && (

            <h2 className="font-semibold">{loggedInUserData.companyName}</h2>
            )}
            <p className="text-gray-600">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius
              nobis, ratione hic, sunt accusantium ut odit temporibus magni quia
            </p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div>
              <Image
                src="/icon/verified.png"
                width={100}
                height={100}
                alt="Verified"
              />
            </div>
            <div className="border-b-[1px]  hover:font-semibold  border-dashed border-gray-500">
              <Link href="/dashboard/profile" className="cursor-pointer">Add Business Details</Link>
            </div>
          </div>
        </div>

        <div className="shadow-md w-full lg:w-96 bg-white h-auto lg:h-68 flex flex-col space-y-4 justify-center rounded-md p-5 hover:shadow-xl">
          <p className="font-medium">User details</p>
          <div className="flex flex-row space-x-5 items-center ">
            <Image src="/user-icon.png" height={65} width={65} alt="Admin" />
            <div className=" flex flex-col space-y-1">
              <p className="text-xl font-semibold">Mehul Patel</p>
              <span className="text-gray-400 text-base">Manager</span>
            </div>
          </div>
          <div className="flex flex-row space-x-5 items-center ">
            <Image src="/user-icon.png" height={65} width={65} alt="Admin" />
            <div className=" flex flex-col space-y-1">
              <p className="text-xl font-semibold">Durgesh Pueskar</p>
              <span className="text-gray-400 text-base">Manager</span>
            </div>
          </div>
          <div className=" flex justify-end hover:font-semibold ">
            <div className=" border-b-[1px] border-dashed border-gray-500">
              <button>Add User</button>
            </div>
          </div>
        </div>

        <div className="shadow-md w-full lg:w-96 bg-white flex flex-row lg:space-x-5 p-5 justify-center rounded-md hover:shadow-xl">
          <div className="basis-[50%] flex flex-col space-y-4">
            <p className="font-medium ">Member Since</p>
            <span>  {memberSince && (
              memberSince.days > 0
                ? `${memberSince.days} days`
                : `${memberSince.hours} hours, ${memberSince.minutes} minutes` 
            )}</span>
            <div className="flex flex-col space-y-1">
              <p className="text-xl font-semibold">Rating</p>
              <Image src="/rating.png" width={100} alt="rating" height={100} />
            </div>
            <div className="flex flex-col space-y-1">
              <p className="text-xl font-semibold">Business Type</p>
              <p>Clothing</p>
            </div>
          </div>
          <div className="basis-[50%] flex flex-col space-y-5">
            <p className="font-medium">Profile Complete</p>
            <div className="border-2 w-40 h-40 rounded-full  border-green-500 justify-center flex flex-row items-center">
                  <p className="font-semibold text-green-500 text-xl">
                    96%
                    </p>
              </div>
          
          </div>
        </div>
      </div>
      
    </>
  );
};

export default DashboardTop;
