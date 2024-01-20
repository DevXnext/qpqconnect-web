import Image from 'next/image'
import { useEffect, useState } from "react";
import { getFirestore, collection, orderBy, query, limit, getDocs } from "firebase/firestore";
import { app } from "../../app/firebase";
const AdminDetails = () => {
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
     <div className="flex flex-col space-y-5 p-5 bg-white shadow-sm rounded-sm " >
        <h2 className='font-semibold text-2xl'>Admin Details</h2>
  <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8">
    <div className='basis-[70%]  flex flex-col space-y-5 '>
    <div className="flex-1 flex-col space-y-3">
      <label className="font-semibold text-gray-700">User Name</label>
      <input
        type="text"
        className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
        placeholder="Type name here.."
      />
    </div>
    <div className="flex-1 flex-col space-y-3">
 
      <label className="font-semibold text-gray-700">Phone Number</label>   
      {latestUserData && (
      <input
        type="text"
        className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
        placeholder="Type name here.." value={latestUserData.mobileNumber}
      />
      )}
    </div>
    
    <div className="flex-1 flex-col space-y-3">
      <label className="font-semibold text-gray-700">Email Address</label>
      {latestUserData && (
      <input
        type="text"
        className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
        placeholder="Type name here.." value={latestUserData.emailAddress}
      />
      )}
    </div>
    </div>
    <div className='basis-[30%] flex flex-col space-y-5 justify-center w-full items-center relative'>
  <div className='relative'>
    <Image src="/camera.svg" width={40} height={40} alt='camera' className='absolute top-44 left-20 bg-white p-1 rounded-full ' />
    <Image src="/profile.svg" width={200} height={200} alt='profile' className='border rounded-full p-2' />
  </div>
  <div>
    <p>Profile Picture</p>
  </div>
  <div className="flex flex-row space-x-6">
    <button className="bg-black px-8 py-2 rounded-lg text-1xl  font-semibold
    hover:bg-white hover:border-black hover:text-black border-2 text-white">Save</button>
    <button className="bg-white px-8 py-2 rounded-lg text-1xl  font-semibold
    hover:bg-black border-black hover:text-white border-2 text-black">Reset</button>
  </div>
</div>

    

   
  </div>

 
</div>
  </>
  )
}

export default AdminDetails