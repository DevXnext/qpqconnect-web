"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { parseCookies } from "nookies";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
const ProfileBusinessMedia = () => {
  const storage = getStorage();
  const fileInputRef = useRef(null);

  // Multiple images
  const [selectedComplexImages, setSelectedComplexImages] = useState([]);

  const handleDropComplexImages = (e) => {
    e.preventDefault();
    const complexFiles = e.dataTransfer.files;
    handleComplexImageChange(complexFiles);
  };

  const handleComplexImageChange = (complexFiles) => {
    const newComplexImages = [...selectedComplexImages];

    for (let i = 0; i < complexFiles.length; i++) {
      const complexFile = complexFiles[i];
      const objectURL = URL.createObjectURL(complexFile);

      newComplexImages.push({
        id: Date.now() + i,
        file: complexFile,
        src: objectURL,
      });
    }

    setSelectedComplexImages(newComplexImages);
  };

  const handleRemoveComplexImages = (id) => {
    const newComplexImages = selectedComplexImages.filter(
      (complexImage) => complexImage.id !== id
    );
    setSelectedComplexImages(newComplexImages);
  };

  const handleComplexInputImagesChange = (e) => {
    const complexFiles = e.target.files;
    handleComplexImageChange(complexFiles);
  };

  const handleComplexBoxImagesClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async () => {
    try {
      const cookies = parseCookies();
      const user_access_token = cookies.user_access_token;
  
      if (!user_access_token) {
        // Handle the case where the user access token is not available
        toast.error("User access token not available. Please log in.");
        return;
      }
  
      const storageRef = ref(storage, `companyImages/${user_access_token}`);
  
      for (const complexImage of selectedComplexImages) {
        const filename = `${Date.now()}_${complexImage.id}.png`;
        const imageRef = ref(storageRef, filename);
  
        await uploadBytes(imageRef, complexImage.file);
  
        const downloadURL = await getDownloadURL(imageRef);
  
        // console.log("Image uploaded, Download URL:", downloadURL);
        toast.success("Image uploaded successfully !");
      }
  
      setSelectedComplexImages([]);
    } catch (error) {
      toast.error("Failed to upload company media. Please try again.");
      console.error("Error uploading images:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-5 p-5 bg-white hover:shadow-xl shadow-sm rounded-md">
        <h2 className="font-semibold text-2xl">Company Media</h2>
        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8">
          <div className="flex-1 flex-col space-y-3">
            <label className="font-semibold text-gray-600">Upload Images</label>

            <div
              className="bg-gray-100 border border-dashed  border-gray-300 rounded-md w-full h-64 overflow-auto"
              onDrop={handleDropComplexImages}
              onDragOver={(e) => e.preventDefault()}
              onClick={handleComplexBoxImagesClick}
            >
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4">
                {selectedComplexImages.map((complexImage) => (
                  <div key={complexImage.id} className="relative">
                    <Image
                      width={200}
                      height={200}
                      src={complexImage.src}
                      alt="Selected Complex Image"
                      className="max-h-full max-w-full  cursor-pointer object-cover"
                    />
                    <button
                      onClick={() => handleRemoveComplexImages(complexImage.id)}
                      className="absolute top-2 right-2 text-red-500 cursor-pointer"
                    >
                      &#x2715;
                    </button>
                  </div>
                ))}
              </div>

              {selectedComplexImages.length === 0 && (
                <div className="flex flex-col space-y-5 py-10 items-center justify-center ">
                  <Image src="/image.svg" width={45} height={45} alt="" />
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleComplexInputImagesChange}
                    ref={fileInputRef}
                    multiple
                  />
                  <label
                    htmlFor="complexFileInput"
                    className="cursor-pointer text-gray-500"
                  >
                    Click or drag-and-drop to upload images 
                    
                  </label>
                  <p className="text-sm">Maximum Dimensions: 500 x 700</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row space-x-6">
          <button
            onClick={handleUpload}
            className="bg-black px-8 py-2 rounded-lg text-1xl  font-semibold
    hover:bg-white hover:border-black hover:text-black border-2 text-white"
          >
            Upload
          </button>
         
      
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
      />   </div>
      </div>
    </>
  );
};

export default ProfileBusinessMedia;
