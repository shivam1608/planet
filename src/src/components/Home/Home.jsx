import React,{useState} from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from '../../icons';
import generate from '../../utils/TestDataGen';
import Navbar from '../Navbar/Navbar';
import Video from '../Player/Video';
import Queue from '../Queue/Queue';

const Home = ({setTheme}) => {

  const [src , setSrc] = useState("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4");
  const [sidebar , setSidebar] = useState(false);

  const toggleSidebar = (e) => {
    setSidebar(!sidebar);
  }

  return (
    <>
     <Navbar setTheme={setTheme}/>
      <div className="flex justify-center h-5/6">
        <div className="container h-full">
          <div className="flex w-full justify-center h-full">
            <div className={`aspect-video my-4 ml-4 mt-8 flex justify-start h-fit ${sidebar?"w-2/3 " : "w-10/12"}`}>
                <Video className="" src={src}></Video>
                <div className="flex items-center">
                  <div onClick={toggleSidebar}  className="bg-primary rounded-full h-fit ml-2">
                    {sidebar?<ArrowRightIcon />:<ArrowLeftIcon />}
                  </div>
                </div>
            </div>
            
            {
              sidebar && <div className="flex justify-end font-ubuntu w-1/3 py-5 h-full">
              <div className="bg-gray-800 rounded-md flex flex-col ml-2 h-full scrollbar-hide overflow-y-scroll">
                <span className='text-white text-3xl font-semibold mx-3 mt-3 mb-2'>⏰ Queue</span>
                <Queue className="mx-5 my-2 font-ubuntu" initialQueue={generate(12)} />
              </div>
            </div>
            }
          </div>
        </div>
      </div>
    </>
    
  )
}

export default Home;