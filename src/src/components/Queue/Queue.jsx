import React, { useState , useEffect } from 'react';
import Item from './Item';

const Queue = ({initialQueue , className}) => {

    const [queue , setQueue] = useState(initialQueue);
    const [over , setOver] = useState(undefined);


    return (
        <div className={`${className} flex-col flex text-white`}>
            {queue.map((v , i)=><Item key={i} queueid={i} value={v} queue={queue} setQueue={setQueue} over={over} setOver={setOver} />)}
        </div>
    )
}

export default Queue;