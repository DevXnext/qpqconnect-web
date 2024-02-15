import React from 'react'
import FilterSidenav from './FilterSidenav'
import ProductList from './ProductList'
import NavbarDark from '@/components/navbar/NavbarDark'
import { Footer } from '@/app/home/components/Footer'

export default function Products() {
   
  return (
    <>
      <NavbarDark/>
      <div className="content flex flex-col md:flex-row md:container items-start justify-between mt-20">
        <FilterSidenav/>
        <ProductList/>  
      </div>
        <Footer/>
    </>
  )
}
