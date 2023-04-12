import { useEffect, useState } from "react";
import { Home } from "./components";
import {BrowserView , MobileView , isBrowser} from "react-device-detect";
import GitBtn from "./components/Navbar/GitBtn";

function App() {

  const [theme , setTheme] = useState("theme-blue");


  useEffect(() => {
    if(isBrowser){
      let theme = localStorage.getItem("data-theme");
      if(!theme){
        theme = "theme-blue";
      }
      setTheme(theme);
      const currentStamp = new Date().getTime();
      let dels = localStorage.getItem("del")||'[]';
      dels = JSON.parse(dels);
      let rms = dels.filter(v=>v.delstamp<currentStamp);
      rms.forEach(v => {
        if(localStorage.getItem(v.hash)){
          localStorage.removeItem(v.hash);
        }
      });
      dels = dels.filter(v=>v.delstamp>currentStamp);
      localStorage.setItem("del" , JSON.stringify(dels));
      }
  }, []);
  

  return (
    <div className={`App bg-gray-900 h-screen ${theme} relative`}>
      <BrowserView className="h-screen relative">
        <Home setTheme={setTheme}/>
      </BrowserView>
      <MobileView className="h-screen">
      <div className="flex justify-center items-center h-full w-full">
        <div className="flex flex-col justify-center items-center">
            <span className="p-4 text-center text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 font-bold">Coming soon on mobile devices.</span>
            <GitBtn className="mt-5 w-10 h-10 px-0.5 mx-1.5" />
        </div>
      </div>
      </MobileView>
    </div>
  )
}

export default App;
