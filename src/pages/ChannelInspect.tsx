import { Chart } from '@/components/Chart'
import GridBackground from '@/utils/GridBackground'
import React from 'react'

const ChannelInspect = () => {
  return (
    <div>
      <GridBackground />

      <div className='grid grid-cols-[1fr_2fr] gap-5 p-8'>

        <div className='border h-full w-full rounded-xl p-4 flex flex-col gap-4 backdrop-blur-lg'>
          <div>
            <img src="https://timelinecovers.pro/facebook-cover/download/youtube-facebook-cover.jpg" alt="" className='w-full rounded-xl' />
          </div>
          <div className='flex items-center gap-8'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&s" alt="" className='rounded-full w-24' />
            <h1 className='text-2xl font-bold'>Name</h1>
          </div>
          <div className='bg-[#d8d8d8] p-4 rounded-xl'>
            <p className='text-gray-900 font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet cupiditate veniam esse dolores aspernatur itaque rerum, vero voluptatibus, odit dolor provident temporibus harum neque</p>
            <p className='text-gray-600 mt-2 font-light'>India</p>
          </div>
        </div>

        <div className='flex flex-col border rounded-xl backdrop-blur-lg w-full p-4 gap-4'>
          <h2 className='text-xl font-semibold'>Channel Statistics</h2>
          {/* <Chart /> */}
          
        </div>

      </div>
    </div>
  )
}

export default ChannelInspect
