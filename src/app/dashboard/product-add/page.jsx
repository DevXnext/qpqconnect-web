"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";

const AddProduct = () => {
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
      <div className="flex flex-col space-y-5">
        <div
          className="border bg-white w-full h-fit rounded-md hover:shadow-xl shadow flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8 p-5"
        >
          <div className="w-full md:w-4/5">
            <h2 className="text-xl font-semibold">General Information</h2>

            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8 mt-5">
              <div className="flex-1  flex-col space-y-3">
                <label className="font-semibold text-gray-700">
                  Product / Service Name
                </label>
                <input
                  type="number"
                  className="bg-gray-50 h-12 border  border-gray-300 rounded-md w-full px-3"
                  placeholder="Type Product name here.."
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8 mt-5">
              <div className="flex-1  flex-col space-y-3">
                <label className="font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  type="number"
                  className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full p-3"
                  rows="4"
                  cols="50"
                  placeholder="Type Product name here.."
                ></textarea>
              </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8 mt-5">
              <div className="flex-1  flex-col space-y-3">
                <label className="font-semibold text-gray-700">
                  Base Price
                </label>
                <input
                  type="number"
                  className="bg-gray-50 h-12 border  border-gray-300 rounded-md w-full px-3"
                  placeholder="$80 for 100 piece"
                />
              </div>
              <div className="flex-1  flex-col space-y-3">
                <label className="font-semibold text-gray-700">
                  Supply Ability
                </label>
                <select className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3">
                  <option>100 Per Week</option>
                  <option>1000 Per Week</option>
                  <option>10000 Per Week</option>
                  <option>100000 Per Week</option>
                  <option>100000 Per Week</option>
                </select>
              </div>

              <div className="flex-1  flex-col space-y-3">
                <label className="font-semibold text-gray-700">
                  Delivery Time
                </label>
                <select className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3">
                  <option>7 Days</option>
                  <option>15 days</option>
                  <option>20 daysk</option>
                  <option>25 days</option>
                  <option>30 days</option>
                  <option>45 days</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/5">
            <h2 className="text-xl font-semibold">Category</h2>

            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8 mt-5">
              <div className="flex-1  flex-col space-y-3">
                <label className="font-semibold text-gray-700">
                  Parent Category
                </label>
                <input
                  type="text"
                  className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
                  placeholder="Clothing"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8 mt-5">
              <div className="flex-1  flex-col space-y-3">
                <label className="font-semibold text-gray-700">
                  Sub Category
                </label>
                <input
                  type="text"
                  className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
                  placeholder="T-shirt"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8 mt-5">
              <div className="flex-1  flex-col space-y-3">
                <label className="font-semibold text-gray-700">
                  Product Code
                </label>
                <input
                  type="text"
                  className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
                  placeholder="#7894"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="border w-full bg-white h-fit rounded-md hover:shadow-xl shadow flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8 p-5"
        >
          <div className="w-full">
            <h2 className="text-xl font-semibold">Media</h2>

            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8 mt-5">
              <div className="flex-1 flex-col space-y-3">
                <label className="font-semibold text-gray-600">Images</label>

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
                          onClick={() =>
                            handleRemoveComplexImages(complexImage.id)
                          }
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
                        Click or drag-and-drop to upload images
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-row space-x-6 mt-5">
              <button
                className="bg-black px-8 py-2 rounded-lg text-1xl  font-semibold
    hover:bg-white hover:border-black hover:text-black border-2 text-white"
              >
                Add
              </button>
              <button
                className="bg-white px-8 py-2 rounded-lg text-1xl  font-semibold
    hover:bg-black border-black hover:text-white border-2 text-black"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
