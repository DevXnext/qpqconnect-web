"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
const ProductDetail = () => {
  const router = useRouter();
  const { productId } = router.query || {}; 
  // console.log(id)
  const [currentImage, setCurrentImage] = useState(0);
const productImages = ["/product_image.png", "/profile.png", "/product_image.png"];

const handleImageChange = (index) => {
  setCurrentImage(index);
};
  return (
    <>
    Product ID: {productId}
       <div className="flex flex-row space-x-10 w-full py-5">
        <div className="border rounded-lg w-2/3 p-5 flex flex-row space-x-10">
        <div className="flex flex-col mt-3 space-y-2 basis-1/7">
            {productImages.map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer border p-1 ${
                  currentImage === index ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => handleImageChange(index)}
              >
                <Image src={image} width={80} height={50} alt={`Product_image${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="relative basis-6/7 flex items-center w-full justify-center">
            <Image
              src={productImages[currentImage]}
              width={500}
              height={300}
              alt={`Product_image${currentImage + 1}`}
            />
          </div>
       
        </div>
        <div className="border rounded-lg w-1/3 p-5">
          <h2 className="text-4xl font-bold mb-4">The Headphones</h2>
          {/* Add other product details here */}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
