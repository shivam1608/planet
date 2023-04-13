import React, { useState, useEffect, useRef } from 'react'
import Loader from './Loader';
import Settings from './Settings';
import SpeedController from './SpeedController';
import VideoController from './VideoController';
import KEY from '../../utils/KeyCodes';
import FirstPlay from './FirstPlay';
import { generateHash } from '../../utils/Utils';

const Video = ({ src , className , goNext , queue , title}) => {

    const [visible, setVisible] = useState(true);
    const [volume, setVolume] = useState(60);
    const [speed, setSpeed] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showSpeed, setShowSpeed] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [volumeRange, setVolumeRange] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [buffering, setBuffering] = useState(true);
    const [hash , setHash] = useState(undefined);
    const video = useRef();
    const canvas = useRef();
    const closeTimeout = useRef(undefined);

    useEffect(() => {
        video.current.muted = isMuted;
    }, [isMuted]);

    useEffect(() => {
        video.current.volume = volume / 100;
        if (volume == 0) {
            setIsMuted(true);
        } else {
            setIsMuted(false);
        }
    }, [volume]);

    useEffect(() => {
        video.current.playbackRate = speed;
    }, [speed]);

    useEffect(() => {
        if(queue.length === 1 && video.current.src === window.location.href){
            goNext();
        }
    }, [queue]);

    useEffect(() => {
       let item = localStorage.getItem(hash);
       if(item){
          setCurrentTime(item);
          video.current.currentTime = item;
       }
    }, [hash]);
    


    const hideBar = () => {
        setVisible(false);
        setShowSettings(false);
        setShowSpeed(false);
        setVolumeRange(false);
        canvas.current.focus();
    }

    const showBar = () => {

        setIsFullscreen(document.fullscreenElement || document.webkitFullscreenElement ||document.mozFullScreenElement);

        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current);
        }
        setVisible(true);
        closeTimeout.current = setTimeout(() => { hideBar() }, 3500);
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
        if (isPlaying) {
            setIsPlaying(false);
            video.current.pause();
        } else {
            setIsPlaying(true);
            video.current.play();
        }
    }

    const seek = (e) => {
        setCurrentTime(e.target.value);
        video.current.currentTime = currentTime;
    }

    const fullscreen = (e) => {
        if (isFullscreen) {
            document.exitFullscreen();
            setIsFullscreen(false);
        } else {
            canvas.current.requestFullscreen();
            setIsFullscreen(true);
        }
    }

    const miniplayer = (e) => {
        video.current.requestPictureInPicture();
    }

    const settings = (e) => {
        if (showSpeed) {
            setShowSpeed(false);
        }
        setShowSettings(!showSettings);
    }

    const speedx = (e) => {
        if (showSettings) {
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
        if(hash){
            localStorage.setItem(hash , currentTime);
        }
    }

    const onBuffer = (e) => {
        setBuffering(true);
    }

    const onPlaying = (e) => {
        setBuffering(false);
        setIsPlaying(true);
    }

    const onEnded = (e) => {
        localStorage.removeItem(hash);
        goNext(e);
    }

    const onLoaded = (e) => {
        setDuration(video.current.duration);
        generateHash(`${title}__++__${duration}`).then((h)=>{
            setHash(h);
            let del = localStorage.getItem("del");
            if(!del){
                del = '[]';
            }
            del = JSON.parse(del);
            if(del.filter((v)=>v.hash==h).length==0){
                del.push({'hash' : h , "delstamp" : new Date().getTime() + (48*1000*60*60)});
                localStorage.setItem("del" , JSON.stringify(del));
            }
        });
        setBuffering(false);
        playHandler();
    }

    const keyboard = (e) => {
        switch (e.keyCode) {
            case KEY.F: {
                fullscreen();
                break;
            }
            case KEY.SPACE_BAR: {
                if(e.target == canvas.current) {
                    e.preventDefault();
                }
                playHandler();
                showBar();
                break;
            }
            case KEY.ARROW_RIGHT: {
                video.current.currentTime += 5;
                showBar();
                break;
            }
            case KEY.ARROW_LEFT: {
                video.current.currentTime -= 5;
                showBar();
                break;
            }
            case KEY.M: {
                muteHandler();
                showBar();
                break;
            }
            default : {
                break;
            }
        }
    }

    useEffect(() => {
        canvas.current.focus();
        closeTimeout.current = setTimeout(() => { hideBar() }, 5000);
    }, []);


    return (
        <>
            <div className={`aspect-video ${className}`} >
                <div onMouseEnter={()=>{canvas.current.focus();}} onKeyDownCapture={keyboard} className="relative focus-visible:outline-none" ref={canvas} tabIndex="-1">
                    {false && <div className='cursor-none'></div>}
                    {showSettings && <Settings />}
                    {showSpeed && <SpeedController speed={speed} changeSpeed={changeSpeed} />}
                    {buffering && <Loader />}
                    {(video.current && video.current.src == window.location.href) && <FirstPlay />}
                    {
                        visible && <VideoController
                            seek={seek}
                            currentTime={currentTime}
                            duration={duration}
                            fullscreen={fullscreen}
                            hideVolumeRange={hideVolumeRange}
                            isFullscreen={isFullscreen}
                            isPlaying={isPlaying}
                            miniplayer={miniplayer}
                            playHandler={playHandler}
                            settings={settings}
                            speedx={speedx}
                            isMuted={isMuted}
                            muteHandler={muteHandler}
                            volume={volume}
                            volumeHandler={volumeHandler}
                            volumeRange={volumeRange}
                            showVolumeRange={showVolumeRange}
                            goNext={goNext}
                        />
                    }
                    <div className="flex justify-center items-center h-full w-full">
                        <video
                            onWaiting={onBuffer}
                            onPause={() => setIsPlaying(false)}
                            onPlaying={onPlaying}
                            onEnded={onEnded}
                            onLoadedData={onLoaded}
                            onTimeUpdate={updateTime}
                            onDoubleClickCapture={fullscreen}
                            onClickCapture={playHandler}
                            onContextMenu={(e) => e.preventDefault()}
                            ref={video}
                            className={`${visible ? "cursor-default z-0" : "cursor-none"} aspect-video w-full`}
                            onMouseMove={showBar}
                            src={src}>
                        </video>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Video;