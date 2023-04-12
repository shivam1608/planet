import React , {useState} from 'react'
import { compressTitle } from '../../utils/Utils';
import Marquee from "react-fast-marquee";
import { DeleteIcon } from '../../icons';

const Item = ({ over , setOver , queue , setQueue ,queueid , value}) => {

    const [active , setActive] = useState(false);


    const onDragEnd = (e) => {
        if(over || over === 0){
            const newQueue = [...queue];
            let targetIndex = parseInt(e.target.getAttribute("data-queue"));
            newQueue.splice(targetIndex , 1);
            newQueue.splice(over , 0 , queue[targetIndex]);
            setQueue(newQueue);
            setOver(undefined);
        }
        setActive(false);
    }

    const onDragOver = (e) => {
        if(e.target.getAttribute("data-queue") == null){
            return;
        }
        setOver(parseInt(e.target.getAttribute("data-queue")));
    }

    const onDragStart = (e) => {
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.effectAllowed = "move";
        setActive(true);
    }

  return (
    <div 
    data-queue={queueid} 
    onDragStart={onDragStart} 
    onDragOver={onDragOver} 
    onDragEnd={onDragEnd} 
    draggable 
    className={`m-0.5 mb-2 px-1 rounded-md bg-primary py-1 bg-gray-600 text-sm ${active?"opacity-50":""}`}
    >
        <div data-queue={queueid} className="flex relative h-full">
            <img draggable="false" src={value.thumbnail} alt="thumb" className='aspect-video h-16' />
            <div className="flex flex-col mx-2 h-full truncate">
                {
                    value.title.length>40 ?
                    <Marquee gradient={false} className='overflow-hidden'><span title={value.title} data-queue={queueid} className='text-white text-xs font-semibold'>{value.title}</span></Marquee>
                    :
                    <span title={value.title} data-queue={queueid} className='text-white text-xs font-semibold'>{value.title}</span>
                }
                <div className="flex items-end mb-1 w-full h-full">
                    <button><DeleteIcon /></button>
                </div>
            </div>
            <div data-queue={queueid} className="absolute right-0 bottom-0 text-xs font-semibold">{value.duration}</div>
        </div>
    </div>
  )
}

export default Item;