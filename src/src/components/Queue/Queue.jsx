import React, { useState , useRef } from 'react';
import {generateVideoThumbnails} from "@rajesh896/video-thumbnails-generator";
import Time from '../../utils/Time';
import Item from './Item';

const Queue = ({queue , setQueue , className }) => {
    const [over , setOver] = useState(undefined);
    const inputFile = useRef();


    const loadVideoFile = (file) => new Promise((resolve, reject) => {
        try {
            let video = document.createElement('video');
            video.preload = 'metadata'
    
            video.onloadedmetadata = function () {
                resolve(this)
            }
    
            video.onerror = function () {
                reject("Invalid video. Please select a video file.");
            }
    
            video.src = window.URL.createObjectURL(file);
        } catch (e) {
            reject(e);
        }
    });


    const addToQueue =async (e) => {
        let file = e.target.files[0];
        const video = await loadVideoFile(file);
        let data = {
            "title" : file.name,
            "duration" : new Time().format(video.duration),
            "thumbnail" : (await generateVideoThumbnails(file , 2))[1],
            "src" : window.URL.createObjectURL(file),
        }
        const newQueue = [...queue];
        newQueue.push(data);
        setQueue(newQueue);
    }


    const removeFromQueue = (e) =>{
        if(!e.target.parentElement.getAttribute("data-queue")){
            return;
        }
        let queueid = parseInt(e.target.parentElement.getAttribute("data-queue"));
        const newQueue = [...queue];
        newQueue.splice(queueid , 1);
        setQueue(newQueue);
    }




    return (
        <div className={`${className} flex-col flex text-white h-full`}>
            {
                queue.length==0 && 
                <>
                    <div className="flex justify-center w-full h-full items-center">
                        <span className='px-4 text-lg font-ubuntu font-semibold text-white'>🙈 No items in Queue</span>
                    </div>
                </>
            }
            {queue.map((v , i)=><Item key={i} queueid={i} value={v} queue={queue} setQueue={setQueue} over={over} setOver={setOver} removeFromQueue={removeFromQueue} />)}
            <div className="flex justify-center items-end h-full">
                <button onClick={()=>{inputFile.current.click()}} className='py-2 my-5 px-8 bg-primary text-white font-semibold font-ubuntu rounded-md w-fit'>
                    📝 Add To Queue
                    <input ref={inputFile}  className='hidden' onChange={addToQueue} type="file" name="video" id="video" accept="video/mp4,video/x-m4v,video/*"></input>
                </button>
            </div>
        </div>
    )
}

export default Queue;