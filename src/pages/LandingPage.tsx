import React from "react"
import FeatureCard from "@/components/FeatureCard"
import Button from "@/components/Button"
import { Link } from "react-router-dom"

const LandingPage = () => {
  return (
    <div className='flex flex-col justify-center items-center mt-8'>
        <h1 className='text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500'>Welcome to Vidtube</h1>
        
        <div className="flex mt-8 gap-8">
            <FeatureCard />
            <FeatureCard />
            <FeatureCard />
            <FeatureCard />
        </div>

        <Link to={'/login'} >
          <Button text="Get Started" className="mt-8" />
        </Link>
    </div>
  )
}

export default LandingPage
