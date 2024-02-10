import * as React from "react"

import { Card, CardContent,CardHeader,CardTitle,CardDescription,CardFooter } from "@/components/ui/card"
import { Label } from "../ui/label"
import Link from "next/link"
import { Button } from "../ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

export default function CardCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full ms-3 md:ms-0 p-0 container "
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 ">
            <div className="p-0 md:p-1">
            <Card className="md:mx-4">
                <CardHeader>
                  <img
                    src='/Rectangle58.png'
                    className="mx-auto pb-5"
                    
                  />
                  <CardTitle className='md:text-xl text-lg'>Apple Airpods Pro MWP22A M/A Bluetooth 7.1</CardTitle>
                  <CardDescription>Min Quantity : 150</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-y-1.5 md:space-x-2">
                    <Label className="text-[20px] font-extrabold">
                      $120.23 
                    </Label>

                    <Label className="text-[14px] text-muted-foreground">
                       per quantity
                    </Label>
                  </div>
                  <CardDescription>Seller Name</CardDescription>
                </CardContent>
                <CardFooter>
                  <Link href='/'>
                    <Button className="w-full">Send Inquiry</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
