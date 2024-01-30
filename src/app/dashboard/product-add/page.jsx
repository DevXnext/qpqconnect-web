"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "../../firebase";
import { parseCookies } from "nookies";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import withAuth from "@/app/lib/auth/page";
import AutocompleteInput from "@/components/Product/auto-complete/page";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const AddProduct = () => {
  const [selectedComplexImages, setSelectedComplexImages] = useState([]);
  const complexFileInputRef = useRef(null);
  const [parentCategory, setParentCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [supplyAbility, setSupplyAbility] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const cookies = parseCookies();
  const user_access_token = cookies.user_access_token;
  
  const fetchCategories = async () => {
    const db = getFirestore();
    const productsRef = collection(db, "products");

    try {
      const productsQuery = query(productsRef);
      const productsSnapshot = await getDocs(productsQuery);

      // Extract unique categories and subcategories
      const uniqueCategories = new Set();
      const uniqueSubcategories = new Set();

      productsSnapshot.forEach((doc) => {
        const data = doc.data();
        uniqueCategories.add(data.parent_Category.toLowerCase());
        uniqueSubcategories.add(data.sub_Category.toLowerCase());
      });

      // Convert sets to arrays
      const categoriesArray = Array.from(uniqueCategories);
      const subcategoriesArray = Array.from(uniqueSubcategories);

      setCategories(categoriesArray);
      setSubcategories(subcategoriesArray);
    } catch (error) {
      console.error("Error fetching categories and subcategories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const handleParentCategorySelect = (selectedCategory) => {
    setParentCategory(selectedCategory);
  };
  const handleSubCategorySelect = (selectedSubCategory) => {
    setSubCategory(selectedSubCategory);
  };

  const generateRandomCategoryId = (categories) => {
    const firstTwoLetters = categories.slice(0, 2).toUpperCase();

    const randomThreeDigits = Math.floor(100 + Math.random() * 900);

    return `${firstTwoLetters}${randomThreeDigits}`;
  };

  const generateRandomSubcategory = (subCategory) => {
    const firstTwoLetters = subCategory.slice(0, 2).toUpperCase();

    const randomThreeDigits = Math.floor(100 + Math.random() * 900);

    return `${firstTwoLetters}${randomThreeDigits}`;
  };

  const generateRandomProductId = (productName) => {
    const firstTwoLetters = productName.slice(0, 3).toUpperCase();

    const randomThreeDigits = Math.floor(1000 + Math.random() * 900);

    return `${firstTwoLetters}${randomThreeDigits}`;
  };

  const handleSaveProduct = async () => {
    try {
      const QPQproductId = generateRandomProductId(productName);

      const storagePath = `companyImages/${user_access_token}/productImages/${QPQproductId}`;
      const storage = getStorage(app);
      let filename;
      for (const complexImage of selectedComplexImages) {
        const imageBlob = await fetch(complexImage.src).then((response) =>
          response.blob()
        );

        const currentDate = new Date()
          .toISOString()
          .split("T")[0]
          .replace(/-/g, "");
        filename = `${productName.slice(
          0,
          3
        )}_${currentDate}_${Date.now()}.jpg`;

        const imageRef = ref(storage, `${storagePath}/${filename}`);

        await uploadBytes(imageRef, imageBlob);

        const imageUrl = await getDownloadURL(imageRef);

        console.log("Image uploaded successfully:", imageUrl);
      }

      const db = getFirestore(app);
      const productsRef = collection(db, "products");
      const productCodeQuery = query(
        productsRef,
        where("prod_Code", "==", productCode)
      );
      const productCodeSnapshot = await getDocs(productCodeQuery);

      if (!productCodeSnapshot.empty) {
        // Product with the same product_Code already exists
        toast.error(
          "Product with the same product code already exists. Please choose a different product code."
        );
        return;
      }

      const categoryQuery = query(
        productsRef,
        where("parent_Category", "==", parentCategory.toLowerCase())
      );
      const subCategoryQuery = query(
        productsRef,
        where("sub_Category", "==", subCategory.toLowerCase())
      );

      const [categoryQuerySnapshot, subCategoryQuerySnapshot] =
        await Promise.all([getDocs(categoryQuery), getDocs(subCategoryQuery)]);

      let categoryId, subCategoryId;

      if (!categoryQuerySnapshot.empty) {
        const existingCategory = categoryQuerySnapshot.docs[0].data();
        categoryId = existingCategory.cat_Id;
      } else {
        // If the parent category doesn't exist, generate a new ID
        categoryId = generateRandomCategoryId(parentCategory.toLowerCase());
      }

      if (!subCategoryQuerySnapshot.empty) {
        const existingSubCategory = subCategoryQuerySnapshot.docs[0].data();
        subCategoryId = existingSubCategory.sub_Cat_Id;
      } else {
        // If the subcategory doesn't exist, generate a new ID
        subCategoryId = generateRandomSubcategory(subCategory.toLowerCase());
      }

      const productData = {
        imagePaths: selectedComplexImages.map(
          () => `${storagePath}/${filename}`
        ),
        product_Name: productName,
        description: description,
        base_Price: basePrice,
        supply_Ability: supplyAbility,
        delivery_Time: deliveryTime,
        prod_Code: productCode,
        QPQ_prod_Id: QPQproductId,
        user_access_token: user_access_token,
        cat_Id: categoryId,
        sub_Cat_Id: subCategoryId,
        parent_Category: parentCategory,
        sub_Category: subCategory,
        CurrentTimeStamp: serverTimestamp(),
      };

      const productRef = collection(db, "products");
      await addDoc(productRef, productData);
      toast.success("Product Added Successfully");
    } catch (error) {
      toast.error("Failed to add product try again later!");
      console.error("Error saving product:", error);
    }
  };
  const handleAdd = async () => {
    await handleSaveProduct();
  };

  return (
    <>
      <div className="flex flex-col space-y-5">
        <div className="border bg-white w-full h-fit rounded-md hover:shadow-xl shadow flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8 p-5">
          <div className="w-full md:w-4/5">
            <h2 className="text-xl font-semibold">General Information</h2>

            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8 mt-5">
              <div className="flex-1  flex-col space-y-3">
                <label className="font-semibold text-gray-700">
                  Product / Service Name
                </label>
                <input
                  type="text"
                  className="bg-gray-50 h-12 border  border-gray-300 rounded-md w-full px-3"
                  placeholder="Type Product name here.."
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8 mt-5">
              <div className="flex-1  flex-col space-y-3">
                <label className="font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full p-3"
                  rows="3"
                  cols="50"
                  placeholder="Type Product name here.."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8 mt-5">
              <div className="flex-1  flex-col space-y-3">
                <label className="font-semibold text-gray-700">
                  Base Price
                </label>
                <input
                  type="text"
                  className="bg-gray-50 h-12 border  border-gray-300 rounded-md w-full px-3"
                  placeholder="$80 for 100 piece"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                />
              </div>
              <div className="flex-1  flex-col space-y-3">
                <label className="font-semibold text-gray-700">
                  Supply Ability
                </label>
                <input
                  type="text"
                  className="bg-gray-50 h-12 border  border-gray-300 rounded-md w-full px-3"
                  placeholder="100 Per Week"
                  value={supplyAbility}
                  onChange={(e) => setSupplyAbility(e.target.value)}
                />
              </div>

              <div className="flex-1  flex-col space-y-3">
                <label className="font-semibold text-gray-700">
                  Delivery Time
                </label>
                <select
                  className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="7 Days">7 Days</option>
                  <option value="15 Days">15 days</option>
                  <option value="20 Days">20 days</option>
                  <option value="25 Days">25 days</option>
                  <option value="30 Days">30 days</option>
                  <option value="45  Days">45 days</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/5">
            <h2 className="text-xl font-semibold">Category</h2>

            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8 mt-5">
              <AutocompleteInput
                label="Parent Category"
                suggestions={categories}
                onSelect={handleParentCategorySelect}
              />
            </div>

            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8 mt-5">
              <AutocompleteInput
                label="Sub category"
                suggestions={subcategories}
                onSelect={handleSubCategorySelect}
              />
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
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border w-full bg-white h-fit rounded-md hover:shadow-xl shadow flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8 p-5">
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
                onClick={handleAdd}
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
        />
      </div>
    </>
  );
};

export default withAuth(AddProduct);
