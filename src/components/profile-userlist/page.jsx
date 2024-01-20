import Image from "next/image";
import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, query, onSnapshot, } from "firebase/firestore";
import { app } from "../../app/firebase";

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
  const [userData, setuserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const useresPerPage = 4; // Number of useres to display per page
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchuserData = async () => {
      try {
        const firestore = getFirestore(app);
        const userCollection = collection(firestore, "users");
        // const userQuery = query(userCollection);

        const unsubscribe = onSnapshot(userCollection, (snapshot) => {
          const useres = snapshot.docs
          .filter((doc) => doc.data().userName) // Filter documents with userName field
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setuserData(useres);
          setLoading(false);
        });
    
        return () => unsubscribe();
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchuserData();
  }, []);

  const filtereduseres = userData.filter((user) =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastuser = currentPage * useresPerPage;
  const indexOfFirstuser = indexOfLastuser - useresPerPage;
  const currentuseres = filtereduseres.slice(indexOfFirstuser, indexOfLastuser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <div className="border w-full h-fit rounded-md hover:shadow-xl shadow flex justify-center flex-col space-y-3 p-5">
        <div className="flex flex-row justify-between items-center border-b-2 pb-2">
          <h2 className="text-lg font-semibold">User Listing</h2>
          <div className="flex flex-row space-x-3">
            <div className="flex flex-row items-center">
              <div className="-mr-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
              <div>
                <input
                  type="text"
                  className="bg-transparent h-10 rounded-md border-[1px] border-gray-300 pl-10 pr-2"
                  placeholder="Search by Username"  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* <div>
              <input
                type="date"
                className="bg-transparent h-10 rounded-md border-[1px] border-gray-300 px-3"
                placeholder="Search by Username"
              />
            </div> */}
          </div>
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
                <>
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader />
                </>
              ) : filtereduseres.length && filtereduseres.length > 0 ? (
                currentuseres.map((user, index) => (
              <tr key={user.id}className="border-b border-blue-gray-200">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 font-semibold text-blue-800">{user.userName}</td>
                <td className="py-3 px-4 font-semibold">{user.emailAddress}</td>
                <td className="py-3 px-4">{user.mobileNumber}</td>
                <td className="py-3 px-4">{user.userRole}</td>

                <td className="py-3 px-4 flex flex-row space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-red-500"
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
                   No Data Found..
                 </td>
               </tr>
             )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-row space-x-5 py-5 w-full items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            troke="currentColor"
            className="w-6 h-6  hover:text-gray-600 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"  onClick={() => setCurrentPage((prevPage) => Math.min(prevPage - 1, Math.ceil(filtereduseres.length / useresPerPage)))}
            />
          </svg>

          {Array.from({ length: Math.ceil((filtereduseres.length || 0) / useresPerPage) }).map((_, index) => (
            <button
              key={index}
              className={` px-3 py-2 hover:bg-gray-200 hover:text-black   rounded-md ${
                currentPage === index + 1 ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 hover:text-gray-600"   onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(filtereduseres.length / useresPerPage)))}
          > 
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default UserListing;