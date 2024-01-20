"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";

const ProfileBusinessMedia = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageChange(file);
    }
  };

  const handleImageChange = (file) => {
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageChange(file);
    }
  };

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  //multiple images
  const [selectedComplexImages, setSelectedComplexImages] = useState([]);
  const complexFileInputRef = useRef(null);

  const handleDropComplexImages = (e) => {
    e.preventDefault();

    const complexFiles = e.dataTransfer.files;
    handleComplexImageChange(complexFiles);
  };

  const handleComplexImageChange = (complexFiles) => {
    const newComplexImages = [...selectedComplexImages];

    for (let i = 0; i < complexFiles.length; i++) {
      const complexReader = new FileReader();
      const complexFile = complexFiles[i];

      complexReader.onload = () => {
        newComplexImages.push({
          id: Date.now() + i,
          src: complexReader.result,
        });
        setSelectedComplexImages([...newComplexImages]);
      };

      complexReader.readAsDataURL(complexFile);
    }
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
    if (complexFileInputRef.current) {
      complexFileInputRef.current.click();
    }
  };
  return (
    <>
 <div className="flex flex-col space-y-5 p-5 bg-white shadow-sm rounded-sm">
  <h2 className="font-semibold text-2xl">Company Media</h2>
  <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8">
    <div className="flex-1 flex-col space-y-3">
      <label className="font-semibold text-gray-600">Logo</label>

      <div
        className="bg-gray-100 flex-col space-y-5 border border-dashed border-gray-300 rounded-md w-full h-64 flex items-center justify-center relative"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={handleBoxClick}
      >
        {selectedImage && (
          <>
            <Image
              height={200}
              width={200}
              src={selectedImage}
              alt="Selected Logo"
              className="max-h-full max-w-full object-contain cursor-pointer"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 text-red-500 cursor-pointer"
            >
              &#x2715;
            </button>
          </>
        )}

        {!selectedImage && (
          <>
            <Image src="/image.svg" width={45} height={45} alt="" />
            <input
              type="file"
              className="hidden "
              onChange={handleInputChange}
              ref={fileInputRef}
            />
            <label
              htmlFor="fileInput"
              className="cursor-pointer text-gray-500"
            >
              Click or drag-and-drop to upload
            </label>
          </>
        )}
      </div>
    </div>
    <div className="flex-1 flex-col space-y-3">
      <label className="font-semibold text-gray-600">
        Complex Images
      </label>

      <div
        className="bg-gray-100 border border-dashed  border-gray-300 rounded-md w-full h-64 overflow-auto"
        onDrop={handleDropComplexImages}
        onDragOver={(e) => e.preventDefault()}
        onClick={handleComplexBoxImagesClick}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
          {selectedComplexImages.map((complexImage) => (
            <div key={complexImage.id} className="relative">
              <Image
                width={200}
                height={200}
                src={complexImage.src}
                alt="Selected Complex Image"
                className="max-h-full max-w-full object-contain cursor-pointer"
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
              ref={complexFileInputRef}
              multiple
            />
            <label
              htmlFor="complexFileInput"
              className="cursor-pointer text-gray-500"
            >
              Click or drag-and-drop to upload
            </label>
          </div>
        )}
      </div>
    </div>
  </div>
  <div className="flex flex-row space-x-6">
    <button className="bg-black px-8 py-2 rounded-lg text-1xl  font-semibold
    hover:bg-white hover:border-black hover:text-black border-2 text-white">Upload</button>
    <button className="bg-white px-8 py-2 rounded-lg text-1xl  font-semibold
    hover:bg-black border-black hover:text-white border-2 text-black">Reset</button>
  </div>
</div>

    </>
  );
};

export default ProfileBusinessMedia;
