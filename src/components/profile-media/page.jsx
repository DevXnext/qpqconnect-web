import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { parseCookies } from "nookies";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
const ProfileMedia = () => {
  const storage = getStorage();
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  const cookies = parseCookies();
  const user_access_token = cookies.user_access_token;

  const handleDeleteImage = async (filename) => {
    try {
      const imageRef = ref(
        storage,
        `companyImages/${user_access_token}/${filename}`
      );
      await deleteObject(imageRef);

      // Update the imageUrls state after deletion
      const updatedUrls = imageUrls.filter(
        (image) => image.filename !== filename
      );
      setImageUrls(updatedUrls);
      toast.success("Image Deleted Successfully!.");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image. Please try again.");
    }
  };

  const handleRefreshImages = async () => {
    try {
      setLoading(true);
      const storageRef = ref(storage, `companyImages/${user_access_token}`);
      const imageList = await listAll(storageRef);
      const urls = await Promise.all(
        imageList.items.map(async (imageRef) => {
          const downloadURL = await getDownloadURL(imageRef);
          const filename = imageRef.name;

          if (filename !== "companyLogo.png") {
            // Extract timestamp from the filename
            const timestamp = parseInt(filename.split('_')[0], 10);
            return { url: downloadURL, filename, timestamp };
          } else {
            return null;
          }
        })
      );
      const filteredUrls = urls.filter((url) => url !== null);
      const latestTimestamp = Math.max(...filteredUrls.map((image) => image.timestamp));

     
      const sortedUrls = filteredUrls.sort((a, b) => {
        if (a.timestamp === latestTimestamp) return -1; 
        if (b.timestamp === latestTimestamp) return 1;
        return b.timestamp - a.timestamp;
      });
  
      setImageUrls(sortedUrls);
      // setLoading(false);
      
    } catch (error) {
      console.error("Error refreshing images:", error);
      setLoading(false);
      toast.error("Failed to refresh images. Please try again.");
    }
    finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (!user_access_token) {
      
      console.error("User access token not available. Please log in.");
      return;
    }
    const storageRef = ref(storage, `companyImages/${user_access_token}`);

    

    const fetchImages = async () => {
      try {
        const imageList = await listAll(storageRef);
        const urls = await Promise.all(
          imageList.items.map(async (imageRef) => {
            const downloadURL = await getDownloadURL(imageRef);
            const filename = imageRef.name;

            if (filename !== "companyLogo.png") {
              // Extract timestamp from the filename
              const timestamp = parseInt(filename.split('_')[0], 10);
              return { url: downloadURL, filename, timestamp };
            } else {
              return null;
            }
          })
        );
        const filteredUrls = urls.filter((url) => url !== null);

        const latestTimestamp = Math.max(...filteredUrls.map((image) => image.timestamp));

        // Sort the urls array by timestamp in descending order
        const sortedUrls = filteredUrls.sort((a, b) => {
          if (a.timestamp === latestTimestamp) return -1; // Latest image comes first
          if (b.timestamp === latestTimestamp) return 1;
          return b.timestamp - a.timestamp;
        });
    
        setImageUrls(sortedUrls);
        setLoading(false);
        
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    fetchImages();
   
  }, 
  
  [user_access_token]);

  
  return (
    <>
      <div className="bg-white hover:shadow-xl shadow-sm rounded-md mb-5 p-5">
        <button
          onClick={handleRefreshImages}
          className="hover:animate-pulse"
        >
          {" "}
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
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
          {loading && (
            <>
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse flex flex-col -space-y-2"
                >
                  <div className="p-2 border-2 rounded-md h-36 overflow-hidden bg-gray-200 animate-pulse"></div>
                </div>
              ))}
            </>
          )}

          {!loading && imageUrls.length === 0 && (
            <p className="text-gray-500 text-center col-span-full">
              No images found.
            </p>
          )}

          {!loading &&
            imageUrls.map((image, index) => (
              <div key={index} className="flex flex-col -space-y-2">
                <div className="z-10 flex justify-end">
                  <button
                    onClick={() => handleDeleteImage(image.filename)}
                    className="text-red-500 cursor-pointer hover:bg-white"
                  >
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
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>

                <div className="p-2 border-2 rounded-md overflow-hidden w-full h-full">
                  <Image
                    src={image.url}
                    width={500}
                    height={700}
                    alt="Images"
                    className="rounded-md w-full h-full"
                  />
                </div>
              </div>
            ))}
       
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
      /> </div>
      </div>
    </>
  );
};

export default ProfileMedia;
