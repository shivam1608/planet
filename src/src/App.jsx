import { useEffect, useState } from "react";
import { Home } from "./components";

function App() {

  const [theme , setTheme] = useState("theme-blue");


  useEffect(() => {
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
  }, []);
  

  return (
    <div className={`App bg-gray-900 h-screen ${theme}`}>
      <Home setTheme={setTheme}/>
    </div>
  )
}

export default App;
