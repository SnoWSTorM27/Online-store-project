import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getGoodsDataStatus, loadGoodsList } from "../../../store/goods";
import Loader from "../../common/loader";
import { loadCategoriesList } from "../../../store/categories";

const GoodsLoader = ({ children }) => {
  const dataStatus = useSelector(getGoodsDataStatus());
  const dispatch = useDispatch();
  useEffect(() => {
    if (!dataStatus) {
      dispatch(loadGoodsList());
      dispatch(loadCategoriesList());
    } 
  }, [dataStatus]);
  if (!dataStatus) return <Loader />;

  return children;
};
GoodsLoader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default GoodsLoader;
