import { FanIcon, Icon } from 'lucide-react';
import React from 'react';

const FeatureCard = ({ para, title }: {
  para: string,
  title: string
}) => {
  return (
    <div className="bg-black rounded-2xl h-48 w-64 border border-[#9e9e9e] backdrop-blur-lg p-8">
      <div className='flex gap-2 items-center'>
        <FanIcon className='h-6 w-6' />
        <h1 className="text-white text-2xl font-semibold">{title}</h1>
      </div>
      <p className="text-gray-300 font-light mt-4 w-full line-clamp-4">{para}</p>
    </div>
  )
}

export default FeatureCard
