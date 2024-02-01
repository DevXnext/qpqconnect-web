"use client"
import withAuth from "@/app/lib/auth/page";
import Image from "next/image";
import React, {useState, useEffect} from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  onSnapshot
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase";
import { parseCookies } from "nookies";
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Retrieve user access token from cookies
    const cookies = parseCookies();
    const userAccessToken = cookies.user_access_token;

    if (userAccessToken) {
      // Query Firestore for user's products based on access token
      const db = getFirestore(app);
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("user_access_token", "==", userAccessToken));

      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const userProducts = [];
        for (const doc of querySnapshot.docs) {
          const productData = doc.data();
          // Fetch image URLs from Storage
          const imagePaths = productData.imagePaths;

          if (imagePaths && imagePaths.length > 0) {
            // Get the download URL for the image at index 0
            const imagePath = imagePaths[0];
            const storage = getStorage(app);
            const imageRef = ref(storage, imagePath);
            const imageUrl = await getDownloadURL(imageRef);

            userProducts.push({
              id: doc.id,
              imageUrl,
              ...productData,
            });
          }
        }

        setProducts(userProducts);
      });

      return () => {
        unsubscribe();
      };
    }
  }, []);
  return (
    <>
   
       <div className="flex flex-col space-y-5 p-5 md:p-5 lg:p-5">
        <div className="flex flex-row justify-between w-full">
          <p className="text-2xl font-semibold">Product List</p>
          <input
            className="border-2 bg-white rounded-lg px-2 w-full md:w-80 h-12 shadow"
            placeholder="Search product by name.."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {products.map((product) => (
        <div key={product.id}  className="border-2 rounded-lg p-4 shadow-lg flex 
         flex-col space-y-5 bg-white">
          <div className="w-full items-center flex flex-col">
          <Image
              src={product.imageUrl}
              width={300}
              height={300}
              alt="product_image" className="rounded-md shadow-sm"
            />
          </div>
            
            <div className="flex flex-col space-y-3">
              <p className="text-1xl font-semibold line-clamp-2 text-wrap">
              {product.product_Name}
              </p>
              <span className="text-gray-400 font-semibold">
                Supply Ability :  {product.supply_Ability}
              </span>
              <div className="flex flex-row space-x-2">
                <p className="text-1xl font-semibold line-clamp-2 text-wrap">
                  {product.base_Price}
                </p>{" "}
                {/* <span className="text-gray-400 font-medium">Per Quantity</span> */}
              </div>
            </div>
          </div>
 ))}
         
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
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>

          <button className="bg-gray-800 px-3 py-2 hover:bg-gray-200 hover:text-black text-white rounded-md">
            1
          </button>
          <button className="bg-gray-200 px-3 py-2 hover:bg-gray-800 hover:text-white text-black rounded-md">
            2
          </button>
          <button className="bg-gray-200 px-3 py-2 hover:bg-gray-800 hover:text-white text-black rounded-md">
            3
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 " 
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

export default withAuth(ProductList);
