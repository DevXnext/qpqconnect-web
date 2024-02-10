"use client"
import ProductList from "@/app/productlisting/components/ProductList"
import { Button } from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function SellerUtility() {

  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-10/12 md:w-5/12 grid-cols-2">
        <TabsTrigger value="account">Seller Profile</TabsTrigger>
        <TabsTrigger value="password">Product & Services</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="">
        <Card className="pt-8 my-5 ">
        <div className="flex justify-center mb-8 md:flex-row flex-col">
         <div className="card shadow-lg px-4 py-4 mx-4 font-bold">
          <img src="/product_image.png" alt="" className="w-48 h-48 mx-auto"/>
          <div>
            <h6 className="title font-bold mt-4">Apple Airpods Pro MWP22A M/A Bluetooth 7.1</h6>
            <span className="text-xs text-gray-500">Min Quantity: 150</span>
            <h6 className="mb-4">$120.23</h6>
            <Button>Send Inquiry</Button>
          </div>
         </div>
         <div className="card shadow-lg px-4 py-4 mx-4 font-bold ">
          <img src="/Rectangle58.png" alt="" className="w-48 h-48 mx-auto"/>
          <div>
            <h6 className="title mt-4">Apple Airpods Pro MWP22A M/A Bluetooth 7.1</h6>
            <span className="text-xs text-gray-500">Min Quantity: 150</span>
            <h6 className="mb-4">$120.23</h6>
            <Button>Send Inquiry</Button>
          </div>
         </div>
        </div>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card className="pt-8 my-5 ">
          <div className="flex justify-center">
        <ProductList/>
        </div>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
