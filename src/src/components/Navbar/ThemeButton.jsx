import React from 'react'

const ThemeButton = ({className , dataTheme , themeChange}) => {
  return (
    <div onClick={themeChange} data-theme={dataTheme} className={`m-0.5 md:m-1.5 rounded-full h-5 w-5 md:h-8 md:w-8 lg:h-9 lg:w-9 transition-all duration-150 hover:scale-105 ${className}`}></div>
  )
}

export default ThemeButton;