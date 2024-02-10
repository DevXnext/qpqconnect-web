import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const discoverData = [
  {
    title: "Electronic Gadgets Seller",
    imgUrl: "/Rectangle58.png",
    subproducts: [
      {
        label: "USB Flash Drive",
        imgUrl: "/usb-flash-drive.jpg",
      },
      {
        label: "Gift Box",
        imgUrl: "/usb-flash-drive.jpg",
      },
      {
        label: "Barbecue Grill",
        imgUrl: "/usb-flash-drive.jpg",
      },
    ],
  },
  {
    title: "Top Ranking Furniture Seller",
    imgUrl: "/Rectangle58.png",
    subproducts: [
      {
        label: "USB Flash Drive",
        imgUrl: "/usb-flash-drive.jpg",
      },
      {
        label: "Gift Box",
        imgUrl: "/usb-flash-drive.jpg",
      },
      {
        label: "Barbecue Grill",
        imgUrl: "/usb-flash-drive.jpg",
      },
    ],
  },
  {
    title: "Deals on Best Apparel Seller",
    imgUrl: "/Rectangle58.png",
    subproducts: [
      {
        label: "USB Flash Drive",
        imgUrl: "/usb-flash-drive.jpg",
      },
      {
        label: "Gift Box",
        imgUrl: "/usb-flash-drive.jpg",
      },
      {
        label: "Barbecue Grill",
        imgUrl: "/usb-flash-drive.jpg",
      },
    ],
  },
];

const Discover = () => {
  return (
    <div className="bg-[#EDF0F5] py-10">
      <div className="w-11/12 mx-auto">
        <Label className="font-bold text-[32px]">
          Discover your next business opportunity
        </Label>

        <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-5 my-10">
          {discoverData.map((i) => (
            <Card className="rounded-2xl px-5" key={i.title}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center text-xl font-bold">
                  {i.title}
                  <Link href="/products">
                    <Button variant="link">View all</Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src={i.imgUrl}
                  height={400}
                  width={400}
                  alt={i.title}
                  className="mx-auto"
                />
              </CardContent>
              <CardFooter className="flex justify-center items-center">
                <div className=" grid grid-cols-3">
                  {i.subproducts.map((x) => (
                    <div
                      className=" flex flex-col justify-center items-center"
                      key={x.label}
                    >
                      <div className="rounded-full h-[90px] w-[90px]">
                        <Image
                          src={x.imgUrl}
                          height={100}
                          width={100}
                          alt={i.title}
                          className=""
                        />
                      </div>
                      <div className="p-2 text-center">
                        <h5>{x.label}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
