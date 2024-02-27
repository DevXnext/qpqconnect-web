"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "../../../firebase";
import withAuth from "@/app/lib/auth/page";
import { Suspense } from 'react';
const ProductDetail = () => {
  return (
    <Suspense>
      <ProductDetailContent />
    </Suspense>
  );
};
const ProductDetailContent = () => {
  const SearchParams = useSearchParams();
  const ParamId = SearchParams.get("productId");
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [productImages, setProductImages] = useState([]);

  const handleImageChange = (index) => {
    setCurrentImage(index);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (ParamId) {
        const db = getFirestore(app);
        const productDoc = doc(db, 'products', ParamId);
        const productSnapshot = await getDoc(productDoc);
        if (productSnapshot.exists()) {
          const productData = productSnapshot.data();
          setProduct(productData);
          if (productData.imagePaths && productData.imagePaths.length > 0) {
            const imagePaths = productData.imagePaths;
            console.log(imagePaths)
            const storage = getStorage(app);
            const images = await Promise.all(imagePaths.map(async (imagePath) => {
              const imageRef = ref(storage, imagePath);
              const imageUrl = await getDownloadURL(imageRef);
              return imageUrl;
            }));
            setProductImages(images);
          }
        } else {
          console.log('Product not found');
        }
      }
    };

    fetchProductDetails();
  }, [ParamId]);


  return (
    <>
   
      <div className="flex flex-row space-x-10 w-full py-5">
        {product && (
          <>
            <div className="border rounded-lg w-3/4 p-5 flex flex-row space-x-10">
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
            <div className="border rounded-lg w-2/4 p-5 flex flex-col space-y-5">
              <h2 className="text-4xl font-bold mb-4">{product.product_Name}</h2>
              <div className="flex flex-col space-y-3">
                <div className="flex flex-row justify-between">
                  <span className="font-medium text-base">Product Code: <b className="text-red-700">{product.prod_Code}</b></span> 
                  <span className="font-medium text-base">Parent Category: <b className="text-green-700">{product.parent_Category}</b></span>
                  <span className="font-medium text-base">Sub Category: <b className="text-cyan-700">{product.sub_Category}</b></span> 
                </div>
                <p>{product.description}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default withAuth(ProductDetail);

