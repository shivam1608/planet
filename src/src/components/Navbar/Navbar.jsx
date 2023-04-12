import React, {useRef, useEffect } from 'react'
import ThemeButton from './ThemeButton';
import GitBtn from './GitBtn';

const Navbar = ({setTheme}) => {

  const earths = ["🌍","🌏","🌎"];
  const earth = useRef();
  const updateInterval = useRef(undefined);

  const handleThemeChange = (e) => {
    let theme = `theme-${e.target.getAttribute("data-theme")}`;
    setTheme(theme);
    localStorage.setItem("data-theme" , theme);
  }

  useEffect(() => {
    if(!updateInterval.current){
      updateInterval.current = setInterval(()=>{
        earth.current.innerHTML = earths[Math.floor(Math.random()*earths.length)];
      } , 2000);
    }
  }, []);
  

  return (
    <div className='font-ubuntu font-semibold p-4 flex bg-gray-900'>
      <span className='absolute flex text-xl md:text-4xl lg:text-5xl text-white border-l-4 border-primary'>
        <span className='hover:scale-110 transition-all duration-150 hover:animate-spin' ref={earth}>🌍</span> 
        <div className="flex flex-col">
          <span>PLANET</span>
          <span className='justify-end flex text-sm text-primary text-end space-y-0 items-center'>
            BY SHIVZEE
            <GitBtn />
          </span>
        </div>
      </span>
      <div className="flex w-full justify-end items-center">
        <ThemeButton themeChange={handleThemeChange} className="bg-red-600" dataTheme="red" />
        <ThemeButton themeChange={handleThemeChange} className="bg-green-600" dataTheme="green" />
        <ThemeButton themeChange={handleThemeChange} className="bg-purple-600" dataTheme="purple" />
        <ThemeButton themeChange={handleThemeChange} className="bg-blue-600" dataTheme="blue" />
      </div>
    </div>
  )
}

export default Navbar;