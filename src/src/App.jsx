import { useEffect, useState } from "react";
import { Home } from "./components";

function App() {

  const [theme , setTheme] = useState("theme-blue");
  const [data , setData] = useState({});


  useEffect(() => {
    let theme = localStorage.getItem("data-theme");
    if(!theme){
      theme = "theme-blue";
    }
    setTheme(theme);
  }, []);
  

  return (
    <div className={`App bg-gray-900 h-screen ${theme}`}>
      <Home setTheme={setTheme} />
    </div>
  )
}

export default App;
