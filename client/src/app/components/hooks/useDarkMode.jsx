import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";

const DarkModeContex = React.createContext();

export const useDarkMode = () => {
  return useContext(DarkModeContex);
}

const isDarkTheme = window?.matchMedia("(prefers-color-scheme: dark)").matches;
const defaultTheme = isDarkTheme ? "dark" : "light";

export const DarkModeProvider = ({ children }) => {

  const [theme, setTheme] = useState(
    localStorage.getItem("app-theme") || defaultTheme
  );

  // useLayoutEffect(() => {
  //   document.documentElement.setAttribute("data-theme", theme)
  //   localStorage.setItem("app-theme", theme)
  // }, [theme])

  useLayoutEffect(() => {
    document.body.dataset.bsTheme = theme;
    localStorage.setItem("app-theme", theme)
  }, [theme])

  

  return (
    <DarkModeContex.Provider value={{theme, setTheme}}>
      {children}
    </DarkModeContex.Provider>
  );
};

DarkModeProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
