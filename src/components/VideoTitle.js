import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className=' w-screen aspect-video my-24 pt-36 px-18 absolute text-white bg-gradient-to-r from-gray'>
        <h1 className='text-4xl font-bold mx-20'>{title}</h1>
        <p className='py-6  w-1/4 mx-20'>{overview}</p>
        <div className='mx-20'>
            <button className='bg-white text-black p-2 w-28 border-2 font-bold rounded-lg hover:scale-110 '> ▶ Play</button>
            <button className='bg-gray-300 text-black p-2 w-28 border-2 font-bold mx-4 rounded-lg hover:scale-110'>More Info.</button>
        </div>
    </div>
  )
}

export default VideoTitle;  