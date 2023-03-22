import React, { useState , useEffect, useRef } from 'react'
import { 
    NextIcon, 
    PlayIcon, 
    SoundIcon, 
    SpeedIcon,
    GearIcon,
    ExpandIcon,
    MiniPlayerIcon,
    PauseIcon,
    DeExpandIcon,
    MutedIcon, 
} from '../../icons';

const Video = ({src}) => {

    const [visible , setVisible] = useState(true);
    const [volume , setVolume] = useState(50);
    const [isMuted , setIsMuted] = useState(false);
    const [isPlaying , setIsPlaying] = useState(false);
    const [isFullscreen , setIsFullscreen] = useState(false);
    const video = useRef();
    const canvas = useRef();
    const closeTimeout = useRef(undefined);

    useEffect(() => {
      video.current.volume = volume/100;
    }, [volume]);

    const hideBar = () => {
        setVisible(false);
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

    const playHandler = (e) => {
        if(isPlaying){
            setIsPlaying(false);
            video.current.pause();
        }else{
            setIsPlaying(true);
            video.current.play();
        }
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

    const muteHandler = (e) => {
        setIsMuted(!isMuted);
        video.current.muted = !isMuted;
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
                visible && 
                <>
                <div className='z-10 bg-opacity-30 backdrop-blur-sm bg-gray-900 absolute bottom-0 w-full h-fit'>
                        <div className='flex fill-white items-center'>
                        <div className="basis-8/12 items-center flex">
                            <button onClick={playHandler} className='p-2 '>{isPlaying ? <PauseIcon /> : <PlayIcon />}</button>
                            <button className='p-2'><NextIcon /></button>
                            <span className='p-2 text-white text-xs'>00:00/00:00</span>
                            <button onClick={muteHandler} className='p-2'>{isMuted ? <MutedIcon /> : <SoundIcon />}</button>
                            <input onChange={volumeHandler} value={volume} className='h-1 w-16' type="range" name="volume" min="0" max="100"/>
                        </div>
                        <div className="flex justify-end w-full">
                            <button className='p-2'><SpeedIcon /></button>
                            <button className='p-2'><GearIcon /></button>
                            <button onClick={miniplayer} className='px-2 py-1'><MiniPlayerIcon /></button>
                            <button onClick={fullscreen} className='p-2'>{isFullscreen ? <DeExpandIcon /> : <ExpandIcon />}</button>
                        </div>
                        </div>
                    </div>
                </>
            }
            <video onDoubleClickCapture={fullscreen} onClickCapture={playHandler} onContextMenu={(e)=>e.preventDefault()} ref={video} className={`${visible?"cursor-default z-0" : "cursor-none"} h-full w-full`} onMouseMove={showBar} src={src}></video>
        </div>
    </div>
    </>
  )
}

export default Video;