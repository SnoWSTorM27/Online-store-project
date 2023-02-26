import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../common/loader";
import {  loadCategoriesList } from "../../../store/categories";
import { loadTabsList } from "../../../store/tabs";
import { getGoodsLoadingStatus, loadGoodsList, getGoodsDataStatus } from "../../../store/goods";
import {  loadUserOrdersList, loadAdminOrdersList, getOrdersDataStatus } from "../../../store/orders";
import localStorageService from "../../../services/localStorage.service";
import { getBagDataStatus, loadUserBagList } from "../../../store/bag";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const bagDataStatus = useSelector(getBagDataStatus());
  const goodsStatusLoading = useSelector(getGoodsLoadingStatus());
  const goodsDataStatus = useSelector(getGoodsDataStatus());
  const ordersDataStatus = useSelector(getOrdersDataStatus());
  const role = localStorageService.getUserRole();
  useEffect(() => {
    if (!bagDataStatus) dispatch(loadUserBagList());
    if (role === "ADMIN") {
      if (!ordersDataStatus) dispatch(loadAdminOrdersList());
    } else {
      if (!ordersDataStatus) dispatch(loadUserOrdersList());
    }
    dispatch(loadCategoriesList());
    dispatch(loadTabsList());
    if (!goodsDataStatus) dispatch(loadGoodsList());
  }, [ordersDataStatus, goodsDataStatus]);
  if (goodsStatusLoading) return <Loader />;

  return children;
};
AppLoader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AppLoader;
