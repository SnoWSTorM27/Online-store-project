import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/user";
import localStorageService from "../../services/localStorage.service";

const AdminProtectedRoute = ({ component: Component, children, ...rest }) => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const role = localStorageService.getUserRole();

  return (<Route { ...rest } render={(props) => {
    if (!isLoggedIn) {
      return <Redirect to={{
        pathname: "/login",
        state: {
          from: props.location
        }
      }} />;
    }
    if (role !== "ADMIN") {
      return <Redirect to={{
        pathname: "/",
        state: {
          from: props.location
        }
      }} />;
    }
    return Component ? <Component {...props}/> : children;
  }}/>);
};
AdminProtectedRoute.propTypes = {
  component: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  location: PropTypes.object
};

export default AdminProtectedRoute;
