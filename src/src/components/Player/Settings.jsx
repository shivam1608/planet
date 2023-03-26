import React from 'react'
import { CaptionIcon, InfoIcon, QualityIcon } from '../../icons';

const Settings = () => {
  return (
    <div className="z-10 absolute bottom-14 right-3 m-1 bg-gray-900 rounded-md bg-opacity-60 backdrop-blur-sm py-2">
        <div className="flex flex-col items-center justify-center text-white fill-white">
            <button className="py-2 px-4 w-full flex items-center"><InfoIcon /><span className="px-2">Info</span> </button>
            <button className="py-2 px-4 w-full flex items-center"><CaptionIcon /><span className="px-2">Captions</span></button>
            <button className="py-2 px-4 w-full flex items-center"><QualityIcon /><span className="px-2">Quality</span></button>
        </div>
    </div>
  )
}

export default Settings;