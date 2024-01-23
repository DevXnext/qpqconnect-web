import Image from "next/image";
import React from "react";

const ProfileMedia = () => {
  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-4 p-5  bg-white shadow-sm rounded-sm">
        <div>
          <Image
            src="/product_image.png"
            width={250}
            height={250}
            alt="Images"
          />
        </div>
        <div>
          <Image
            src="/product_image.png"
            width={250}
            height={250}
            alt="Images"
          />
        </div>
        <div>
          <Image
            src="/product_image.png"
            width={250}
            height={250}
            alt="Images"
          />
        </div>
        <div>
          <Image
            src="/product_image.png"
            width={250}
            height={250}
            alt="Images"
          />
        </div>
        <div>
          <Image
            src="/product_image.png"
            width={250}
            height={250}
            alt="Images"
          />
        </div>
      </div>
    </>
  );
};

export default ProfileMedia;
