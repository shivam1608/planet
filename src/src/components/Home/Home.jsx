import React,{useState} from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from '../../icons';
import Navbar from '../Navbar/Navbar';
import Video from '../Player/Video';
import Queue from '../Queue/Queue';

const Home = ({setTheme}) => {

  const [src , setSrc] = useState("");
  const [title , setTitle] = useState("Now Playing");
  const [sidebar , setSidebar] = useState(true);

  
  const [queue , setQueue] = useState([]);

  const toggleSidebar = (e) => {
    setSidebar(!sidebar);
  }

  const goNext = (e) => {
    if(queue.length!=0){
      setSrc(queue[0].src);
      setTitle(queue[0].title);
      let newQueue = [...queue];
      newQueue.splice(0 , 1);
      setQueue(newQueue);
    }
  }
  


  return (
    <>
     <Navbar setTheme={setTheme}/>
      <div className="flex justify-center h-5/6">
        <div className="container h-full transition-all duration-150">
          <div className="flex w-full justify-center h-full  items-center">
            <div className={` my-4 ml-4 flex justify-start h-fit ${sidebar?"w-5/6 " : "w-10/12"}`}>
                <div className="flex flex-col w-full h-auto">
                  <Video goNext={goNext} queue={queue} className="" src={src}></Video>
                  <span className='m-2 text-xl text-primary font-ubuntu font-semibold'>{title}</span>
                </div>
                <div className="flex items-center">
                  <div onClick={toggleSidebar}  className="bg-gray-800 rounded-full h-fit ml-2">
                    {sidebar?<ArrowRightIcon />:<ArrowLeftIcon />}
                  </div>
                </div>
            </div>

            <div className={`transition-all duration-150 flex justify-center items-center h-full max-w-sm ${sidebar?"scale-100 w-1/3":"scale-0 w-0"}`}>
                <div className="flex items-center justify-end font-ubuntu py-5 pr-2 w-full h-full max-h-full">
                <div className="jutify-center bg-gray-800 rounded-md flex flex-col ml-2 w-full h-full scrollbar-hide overflow-y-scroll">
                  <span className='text-white text-4xl font-semibold mx-3 mt-3 mb-2'>⏰ Queue</span>
                  <Queue queue={queue} setQueue={setQueue} className="mx-5 my-2 font-ubuntu" />
                </div>
              </div>
            </div>
            

          </div>
        </div>
      </div>
    </>
    
  )
}

export default Home;