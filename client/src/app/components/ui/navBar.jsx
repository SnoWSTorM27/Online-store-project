import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NavProfile from "./navProfile";
import logo from "../../assets/logo/SiberCool.webp";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/user";
import { getBagItems } from "../../store/bag";
import localStorageService from "../../services/localStorage.service";
import { useDarkMode } from "../hooks/useDarkMode";

function NavBar({ ...rest }) {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const { theme, setTheme } = useDarkMode();
  const bagsItems = useSelector(getBagItems());
  const role = localStorageService.getUserRole();
  const handleChange = ( ) => {
    if (theme=== "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("light")
    }
  };

  return (
    <nav className="navbar mb-3">
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-brand">
              <img src={logo} alt="Logo" width="200" height="50" className="d-inline-block align-text-top"></img>
            </Link>
          </li>
          <li className="nav-item d-flex align-items-center">
            <Link to="/goods" className="nav-link">Товары</Link>
          </li>

          { role==="ADMIN" && (
            <>
              <li className="nav-item d-flex align-items-center">
                <Link to="/admin/goods" className="nav-link">Admin</Link>
              </li>
              <li className="nav-item d-flex align-items-center">
                <Link to="/admin/orders" className="nav-link">Заказы</Link>
              </li>
            </>
          )}
        </ul>
        <div className="d-flex">
          <div className="d-flex align-items-center">
            <div className="form-check form-switch mx-5">
              <input onChange={handleChange} className="form-check-input" type="checkbox" role="switch" id="theme" checked={theme === "dark" ? true : false} />
              <label className="form-check-label" htmlFor="theme">{theme === "dark" ? "Тёмная тема" : "Светлая тема"}</label>
            </div>
            <Link className="position-relative mx-4" to="/order">
              {bagsItems?.length > 0 && (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {bagsItems.length}
              </span>)}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="30" 
                height="30" 
                fill="currentColor" 
                className="bi bi-cart2 mr-4" 
                viewBox="0 0 16 16">
                <path 
                  d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
                />
                
              </svg>
            </Link>
          </div>
          <div className="d-flex">
            { isLoggedIn ? (
              <NavProfile />
            ) : (
              <Link to="/login" className="nav-link">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
