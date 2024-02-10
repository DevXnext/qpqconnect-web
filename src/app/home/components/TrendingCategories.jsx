import React from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from 'next/image';
import Link from 'next/link'
export default function TrendingCategories() {
  return (
    <>
      <div className="flex flex-col w-11/12 mx-auto ">
        <div className="flex justify-between flex-wrap py-10">
          <div className="">
            <Label className="md:text-[32px] text-2xl font-bold">Trending Categories</Label>
          </div>
          <div className="text-[18px]">
            <Link href="/category" className=''>
              <Button variant="link" className='p-1 md:p-0'>Browse All Categories</Button>
            </Link>
          </div>
        </div>
        <div className="gap-5 grid lg:grid-cols-6 md:grid-cols-2">
            {/* REMOVE LINE BELOW WHILE ACTUAL IMPLEMENTATION */}
            {Array(12).fill(
                <Card className="" >
              <CardContent className="py-5">
                <Image
                  src="/product_image.png"
                  alt="Category"
                  width={80}
                  height={80}
                  className="mx-auto "
                />
              </CardContent>
              <CardFooter className="">
                <p className="text-[20px] text-sm text-center w-full">Health and Beauty</p>
              </CardFooter>
            </Card>
            )}
            
        
        </div>
        </div>
    </>
  )
}
