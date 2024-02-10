import React from 'react'
import Cards from './Cards'

export default function ProductList() {
    const cardImg = [
        {
            img: 'product_image'
        },
        {
            img: 'product_image'
        },
        {
            img: 'product_image'
        },
        {
            img: 'product_image'
        },
        {
            img: 'product_image'
        },
        {
            img: 'product_image'
        },
        {
            img: 'product_image'
        },
        {
            img: 'product_image'
        },
        {
            img: 'product_image'
        },
    ]
  return (
    <>
       <div className="productListContent mx-8 md:mx-0 lg:columns-3 ">
            {cardImg.map((card)=>(
                <Cards img={card.img} key={card.img}/>
            ))}
        </div>
    </>
  )
}
