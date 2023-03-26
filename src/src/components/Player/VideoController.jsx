import React from 'react'
import { 
    NextIcon, 
    PlayIcon, 
    SoundIcon, 
    Sound2Icon,
    SpeedIcon,
    GearIcon,
    ExpandIcon,
    MiniPlayerIcon,
    PauseIcon,
    DeExpandIcon,
    MutedIcon
} from '../../icons';
import Time from '../../utils/Time';

const VideoController = ({
  seek,
  currentTime,
  duration,
  playHandler,
  isPlaying,
  hideVolumeRange,
  showVolumeRange,
  volumeHandler,
  volume,
  volumeRange,
  speedx,
  settings,
  miniplayer,
  fullscreen,
  isFullscreen,
  muteHandler,
  isMuted
}) => {
  return (
    <div className='z-10 absolute bottom-0 w-full h-fit bg-opacity-30 bg-gradient-to-t from-gray-800 to-transparent'>
      <div className="h-fit">
        <input onInputCapture={seek} onChange={seek} value={currentTime} className='h-[4px] w-full p-0 rounded-none' type="range" name="position" id="position" min="0" max={duration} />
      </div>
      <div className='flex fill-white items-center'>
        <div className="basis-8/12 items-center flex">
          <button onClick={playHandler} className='p-1 '>{isPlaying ? <PauseIcon /> : <PlayIcon />}</button>
          <button className='p-1'><NextIcon /></button>
          <span className='p-1 text-white text-xs'>{new Time(currentTime, duration).getTime()}</span>
          <button onMouseLeave={hideVolumeRange} onMouseEnter={showVolumeRange} onClick={muteHandler} className='p-1'>{isMuted ? <MutedIcon /> : (volume > 40 ? <SoundIcon /> : <Sound2Icon />)}</button>
          {volumeRange && <input onMouseLeave={hideVolumeRange} onMouseEnter={showVolumeRange} onChange={volumeHandler} value={volume} className='h-1 w-16' type="range" name="volume" min="0" max="100" />}
        </div>
        <div className="flex justify-end w-full">
          <button onClick={speedx} className='p-1'><SpeedIcon /></button>
          <button onClick={settings} className='p-1'><GearIcon /></button>
          <button onClick={miniplayer} className='px-2 py-1'><MiniPlayerIcon /></button>
          <button onClick={fullscreen} className='p-1'>{isFullscreen ? <DeExpandIcon /> : <ExpandIcon />}</button>
        </div>
      </div>
    </div>
  )
}

export default VideoController;