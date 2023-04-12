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

    let dels = localStorage.getItem("del");

    if(!dels){
        dels ='[]';
    }

    dels = JSON.parse(dels);
    dels = dels.filter(v=>v.delstamp>new Date().getTime());
    localStorage.setItem("del" , JSON.stringify(dels));
  }, []);
  

  return (
    <div className={`App bg-gray-900 h-screen ${theme}`}>
      <Home setTheme={setTheme}/>
    </div>
  )
}

export default App;
