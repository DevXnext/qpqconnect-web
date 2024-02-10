import React from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function FeaturedSeller() {
    const cardData = [
        {
          icon: "fa-solid fa-cube text-white bg-black p-3 rounded-full",
          label: "100% verified",
          label2: "customer",
        },
        { 
          icon: "fa-solid fa-trophy text-white bg-black p-3 rounded-full",
        label: "trusted", label2: "seller" 
        },
        { 
            icon: "fa-regular fa-credit-card text-white bg-black p-3 rounded-full",
         label: "buy", label2: "leads"
         },
        {
          icon: "fa-solid fa-headphones text-white bg-black p-3 rounded-full",

          label: "support 24/7",
          label2: "contact",
        },
      ];
      
  return (
    <>
       <div className="grid lg:grid-cols-2 w-3/4 mx-auto md:grid-cols-1">
        <div className="">
          <div className="flex flex-col justify-start items-start">
            <span className="w-36 bg-black h-[4px]"></span>
            <div className="md:w-2/4 my-8">
              <h2 className="md:text-[58px] text-4xl font-bold leading-tight">Featured Seller</h2>
              <p className="py-5 text-muted-foreground">
                Problems trying to resolve the conflict between the two major
                realms of Classical physics: Newtonian mechanics
              </p>
            </div>
            <div className="text-[] font-bold flex justify-start items-center">
              Learn More
            </div>
          </div>
        </div>
        <div className="h-full flex items-center justify-center ">
          <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-5 lg:w-full md:w-1/2 md:pt-5 ">
            {cardData.map((i) => (
              <Alert className="space-x-5 border-none flex items-center" key={i.label}>
                <i className={i.icon}></i>
                {/* <Avatar>
                  <AvatarFallback className="bg-black text-white">
                    {i.icon}
                  </AvatarFallback>
                </Avatar> */}
                <div>
                <AlertTitle className="font-bold">
                  {i.label.toUpperCase()}
                </AlertTitle>
                <AlertDescription className="font-bold">
                  {i.label2.toUpperCase()}
                </AlertDescription>
                </div>
              </Alert>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
