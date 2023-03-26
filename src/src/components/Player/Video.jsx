import React, { useState , useEffect, useRef } from 'react'
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
    MutedIcon,
    CaptionIcon,
    QualityIcon,
    InfoIcon, 
} from '../../icons';
import Time from '../../utils/Time';

const Video = ({src}) => {

    const [visible , setVisible] = useState(true);
    const [volume , setVolume] = useState(60);
    const [speed , setSpeed] = useState(1);
    const [isMuted , setIsMuted] = useState(false);
    const [isPlaying , setIsPlaying] = useState(false);
    const [isFullscreen , setIsFullscreen] = useState(false);
    const [showSpeed , setShowSpeed] = useState(false);
    const [showSettings , setShowSettings] = useState(false); 
    const [volumeRange , setVolumeRange] = useState(false);
    const [currentTime , setCurrentTime] = useState(0);
    const [duration , setDuration] = useState(0);
    const [buffering , setBuffering] = useState(true);
    const video = useRef();
    const canvas = useRef();
    const closeTimeout = useRef(undefined);

    useEffect(() => {
        video.current.muted = isMuted;
    }, [isMuted]);

    useEffect(() => {
      video.current.volume = volume/100;
      if(volume==0){
        setIsMuted(true);
      }else{
        setIsMuted(false);
      }
    }, [volume]);

    useEffect(() => {
      video.current.playbackRate = speed;
    }, [speed]);
    

    const hideBar = () => {
        setVisible(false);
        setShowSettings(false);
        setShowSpeed(false);
        setVolumeRange(false);
    }

    const showBar = () => {
        if(closeTimeout.current){
            clearTimeout(closeTimeout.current);
        }
        setVisible(true);
        closeTimeout.current = setTimeout(()=>{hideBar()} , 3000);
    }

    const volumeHandler = (e) => {
        setVolume(e.target.value);
    }

    const showVolumeRange = (e) => {
        setVolumeRange(true);
    }

    const hideVolumeRange = (e) => {
        setVolumeRange(false);
    }

    const playHandler = (e) => {
        if(isPlaying){
            setIsPlaying(false);
            video.current.pause();
        }else{
            setIsPlaying(true);
            video.current.play();
        }
    }

    const seek = (e) => {
        setCurrentTime(e.target.value);
        video.current.currentTime = currentTime;
    }

    const fullscreen = (e) => {
        if(isFullscreen){
            document.exitFullscreen();
            setIsFullscreen(false);
        }else{
            canvas.current.requestFullscreen();
            setIsFullscreen(true);
        }
    }

    const miniplayer = (e) => {
        video.current.requestPictureInPicture();
    }

    const settings = (e) => {
        if(showSpeed){
            setShowSpeed(false);
        }
        setShowSettings(!showSettings);
    }

    const speedx = (e) => {
        if(showSettings){
            setShowSettings(false);
        }
        setShowSpeed(!showSpeed);
    }

    const changeSpeed = (e) => {
        setSpeed(e.target.value);
    }

    const muteHandler = (e) => {
        setIsMuted(!isMuted);
    }

    const updateTime = () => {
        setCurrentTime(video.current.currentTime);
    }

    const onBuffer = (e) => {
        setBuffering(true);
    }

    const onPlaying = (e) => {
        setBuffering(false);
        setIsPlaying(true);
    }

    const onLoaded = (e) => {
        setDuration(video.current.duration);
        setBuffering(false);
    }

    useEffect(() => {
        closeTimeout.current = setTimeout(()=>{hideBar()} , 5000);
    }, []);
        

  return (
    <>
    <div className='aspect-auto w-5/12 md:w-6/12 lg:w-7/12 h-auto' >
        <div className="relative" ref={canvas}>
            {false && <div className='cursor-none'></div>}
            {
                showSettings && <div className="z-10 absolute bottom-14 right-3 m-1 bg-gray-900 rounded-md bg-opacity-60 backdrop-blur-sm py-2">
                    <div class="flex flex-col items-center justify-center text-white fill-white">
                        <button className="py-2 px-4 w-full flex items-center"><InfoIcon /><span className="px-2">Info</span> </button>
                        <button className="py-2 px-4 w-full flex items-center"><CaptionIcon /><span className="px-2">Captions</span></button>
                        <button className="py-2 px-4 w-full flex items-center"><QualityIcon /><span className="px-2">Quality</span></button>
                    </div>
                </div>
            }
            {
                showSpeed && <div className="z-10 absolute bottom-14 right-3 m-1 bg-gray-900 rounded-md bg-opacity-60 backdrop-blur-sm py-2">
                    <div class="flex flex-col items-center justify-center text-white fill-white px-3">
                        <span className='w-full text-right text-xs cursor-pointer'>custom?</span>
                    <label htmlFor="speed">{speed}x</label>
                    <input onInputCapture={changeSpeed} onChange={changeSpeed} value={speed} className="h-1.5" step="0.25"  min="0.25" max="5" type="range" name="speed" id="speed" />
                    </div>
                </div>
            }
            {
                buffering &&  <div className="absolute bottom-1/2 right-1/2">
                <div class="flex items-center justify-center">
                    <div
                        class="text-blue-500 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="loading">
                        <span
                        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading...</span>
                    </div>
                </div>
            </div>
            }
            {
                visible && 
                <>
                <div className='z-10 absolute bottom-0 w-full h-fit bg-opacity-30 bg-gradient-to-t from-gray-800 to-transparent'>
                        <div className="h-fit">
                            <input onInputCapture={seek} onChange={seek} value={currentTime} className='h-[4px] w-full p-0 rounded-none' type="range" name="position" id="position" min="0" max={duration} />
                        </div>
                        <div className='flex fill-white items-center'>
                            <div className="basis-8/12 items-center flex">
                                <button onClick={playHandler} className='p-1 '>{isPlaying ? <PauseIcon /> : <PlayIcon />}</button>
                                <button className='p-1'><NextIcon /></button>
                                <span className='p-1 text-white text-xs'>{new Time(currentTime , duration).getTime()}</span>
                                <button onMouseLeave={hideVolumeRange} onMouseEnter={showVolumeRange} onClick={muteHandler} className='p-1'>{isMuted ? <MutedIcon /> : (volume>40?<SoundIcon />:<Sound2Icon />)}</button>
                                {volumeRange && <input  onMouseLeave={hideVolumeRange} onMouseEnter={showVolumeRange}  onChange={volumeHandler} value={volume} className='h-1 w-16' type="range" name="volume" min="0" max="100"/>}
                            </div>
                            <div className="flex justify-end w-full">
                                <button onClick={speedx} className='p-1'><SpeedIcon /></button>
                                <button onClick={settings} className='p-1'><GearIcon /></button>
                                <button onClick={miniplayer} className='px-2 py-1'><MiniPlayerIcon /></button>
                                <button onClick={fullscreen} className='p-1'>{isFullscreen ? <DeExpandIcon /> : <ExpandIcon />}</button>
                            </div>
                        </div>
                </div>
                </>
            }
            <video onWaiting={onBuffer} onPause={()=>setIsPlaying(false)} onPlaying={onPlaying} onEnded={playHandler} onLoadedData={onLoaded} onTimeUpdate={updateTime} onDoubleClickCapture={fullscreen} onClickCapture={playHandler} onContextMenu={(e)=>e.preventDefault()} ref={video} className={`${visible?"cursor-default z-0" : "cursor-none"} h-full w-full`} onMouseMove={showBar} src={src}></video>
        </div>
    </div>
    </>
  )
}

export default Video;