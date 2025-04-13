import { FanIcon, Icon } from 'lucide-react';
import React from 'react';

const FeatureCard = ({ para, title }: {
  para: string,
  title: string
}) => {
  return (
    <div className="bg-black rounded-2xl h-48 w-64 border border-[#9e9e9e] backdrop-blur-lg p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out hover:scale-105">
      <div className="flex items-center gap-3">
        <FanIcon className="h-6 w-6 text-white" />
        <h1 className="text-white text-xl font-semibold">{title}</h1>
      </div>
      <p className="text-gray-400 text-sm font-light mt-4 line-clamp-4">
        {para}
      </p>
    </div>
  )
}

export default FeatureCard
