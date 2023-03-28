import { useState } from "react";
import { Video , Queue, Navbar, Home } from "./components";
import generate from './utils/TestDataGen';

function App() {

  const [src , setSrc] = useState("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4");
  const [theme , setTheme] = useState("theme-blue");

  const testing = (e) => {
    let fileUrl = window.URL.createObjectURL(e.target.files[0]);
    setSrc(fileUrl);
  }

  return (
    <div className={`App bg-gray-900 h-screen ${theme}`}>
       {/* <div className="flex justify-center items-center h-screen">
        <div className="flex justify-center items-center container">
          <Video className="w-5/12 md:w-6/12 lg:w-7/12 h-auto" src={src}></Video>
          <div className="w-96">
            
          </div>
        </div>
       </div> */}
      <Home setTheme={setTheme} />

    </div>
  )
}

export default App;
