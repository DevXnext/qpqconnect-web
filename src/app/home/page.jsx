import React from 'react'
import Hero from './components/Hero'
import FeaturedSeller from './components/FeaturedSeller'
import TrendingCategories from './components/TrendingCategories'
import Discover from './components/Discover'
import FeaturedProducts from './components/FeaturedProducts'
import SimpleSteps from './components/SimpleSteps'
import BuyForm from './components/BuyForm'
import { Footer } from './components/Footer'
export default function page() {
  return (
    <>
    <div className="mb-16">
      <Hero/>
    </div>
    <div className="mb-16">
      <FeaturedSeller/>
    </div>
    <div className="mb-16">
      <TrendingCategories/>
    </div>
    <div className="mb-16">
      <Discover/>
    </div>
    <div className="mb-16">
      <FeaturedProducts/>
    </div>
    <div className="mb-16">
      <SimpleSteps/>
    </div>
    <div className="mb-16">
      <BuyForm/>
    </div>
    <Footer/>
    </>
  )
}
