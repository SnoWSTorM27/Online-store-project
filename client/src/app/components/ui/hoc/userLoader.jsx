import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getUserDataStatus, loadCurrentUser } from "../../../store/user";
import Loader from "../../common/loader";
import localStorageService from "../../../services/localStorage.service";

const UserLoader = ({ children }) => {
  const dataStatus = useSelector(getUserDataStatus());
  const dispatch = useDispatch();
  useEffect(() => {
    if (!dataStatus) dispatch(loadCurrentUser());
  }, [dataStatus]);
  if (!dataStatus) return <Loader />;

  return children;
};
UserLoader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default UserLoader;
