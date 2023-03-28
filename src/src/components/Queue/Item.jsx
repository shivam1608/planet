import React , {useState} from 'react'
import { compressTitle } from '../../utils/Utils';

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
    className={`m-0.5 mb-2 px-1.5 rounded-md bg-primary py-1.5 bg-gray-600 text-sm ${active?"opacity-50":""}`}
    >
        <div data-queue={queueid} className="flex relative">
            <img draggable="false" src={value.thumbnail} alt="thumb" className='aspect-video h-20' />
            <div className="flex mx-2 justify-center h-fit">
                <span title={value.title} data-queue={queueid} className='text-white font-semibold'>{compressTitle(value.title)}</span>
            </div>
            <div data-queue={queueid} className="absolute right-0 bottom-0 text-xs">{value.duration}</div>
        </div>
    </div>
  )
}

export default Item;