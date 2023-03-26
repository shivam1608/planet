import React from 'react'

const SpeedController = ({speed , changeSpeed}) => {
  return (
    <div className="z-10 absolute bottom-14 right-3 m-1 bg-gray-900 rounded-md bg-opacity-60 backdrop-blur-sm py-2">
      <div className="flex flex-col items-center justify-center text-white fill-white px-3">
        <span className='w-full text-right text-xs cursor-pointer'>custom?</span>
        <label htmlFor="speed">{speed}x</label>
        <input onInputCapture={changeSpeed} onChange={changeSpeed} value={speed} className="h-1.5" step="0.25"  min="0.25" max="5" type="range" name="speed" id="speed" />
      </div>
    </div>
  )
}

export default SpeedController;