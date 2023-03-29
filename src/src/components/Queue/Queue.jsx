import React, { useState , useEffect } from 'react';
import generate from '../../utils/TestDataGen';
import Item from './Item';

const Queue = ({initialQueue , className}) => {

    const [queue , setQueue] = useState(initialQueue);
    const [over , setOver] = useState(undefined);


    const addToQueue = (e) => {
        const newQueue = [...queue];
        newQueue.push(...generate(1));
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
            {queue.map((v , i)=><Item key={i} queueid={i} value={v} queue={queue} setQueue={setQueue} over={over} setOver={setOver} />)}
            <div className="flex justify-center items-end h-full">
                <button onClick={addToQueue} className='py-2 my-5 px-8 bg-primary text-white font-semibold font-ubuntu rounded-md w-fit'>📝 Add To Queue</button>
            </div>
        </div>
    )
}

export default Queue;