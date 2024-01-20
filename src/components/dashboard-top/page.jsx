import Image from "next/image";
import { useEffect, useState } from "react";
import { getFirestore, collection, orderBy, query, limit, getDocs } from "firebase/firestore";
import { app } from "../../app/firebase";

const DashboardTop = () => {
  const [latestUserData, setLatestUserData] = useState(null);

  useEffect(() => {
    const fetchLatestUserData = async () => {
      try {
        const userCollectionRef = collection(getFirestore(app), "users");
        const userQuery = query(userCollectionRef, orderBy("timestamp", "desc"), limit(1));
        const userQuerySnapshot = await getDocs(userQuery);
        console.log("User Query Snapshot:", userQuerySnapshot);
        userQuerySnapshot.forEach((doc) => {
          console.log("User Data:", doc.data());
        });
        if (!userQuerySnapshot.empty) {
          // Found the latest user, extract user data
          const latestUserDoc = userQuerySnapshot.docs[0];
          setLatestUserData(latestUserDoc.data());
          console.log(latestUserDoc.data());
        } else {
          console.log("No users found");
        }
      } catch (error) {
        console.error("Error fetching latest user data:", error);
      }
    };

    fetchLatestUserData();
  }, []);


  return (
    <>
        
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="shadow-md bg-white w-full lg:w-96 h-auto lg:h-68 flex flex-col justify-center space-y-5 rounded-md p-5 hover:shadow-xl">
          <p className="font-medium">Company Details</p>
          <div className="space-y-2">
          {latestUserData && (

            <h2 className="font-semibold">{latestUserData.companyName}</h2>
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
              <button>Add Business Details</button>
            </div>
          </div>
        </div>

        <div className="shadow-md w-full lg:w-96 bg-white h-auto lg:h-68 flex flex-col space-y-4 justify-center rounded-md p-5 hover:shadow-xl">
          <p className="font-medium">User details</p>
          <div className="flex flex-row space-x-5 items-center ">
            <Image src="/user-icon.png" height={65} width={65} alt="Admin" />
            <div className=" flex flex-col space-y-1">
              <p className="text-xl font-semibold">John Deo</p>
              <span className="text-gray-400 text-base">Manager</span>
            </div>
          </div>
          <div className="flex flex-row space-x-5 items-center ">
            <Image src="/user-icon.png" height={65} width={65} alt="Admin" />
            <div className=" flex flex-col space-y-1">
              <p className="text-xl font-semibold">John Deo</p>
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
            <span>2 year</span>
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
