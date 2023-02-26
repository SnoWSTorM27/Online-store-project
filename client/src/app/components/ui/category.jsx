import React from "react";
import PropTypes from "prop-types";
import Loader from "../common/loader";
import { useSelector } from "react-redux";
import { getCategoriesLoadingStatus, getCategoryById } from "../../store/categories";

const Category = ({ id }) => {
  const category = useSelector(getCategoryById(id));
  const categoriesLoading = useSelector(getCategoriesLoadingStatus());
  if (!categoriesLoading) {
    return (
      <div className="container">
        <p className="m-0">{ category.name }</p>
      </div>
    );
  } else return <Loader />;
};

Category.propTypes = {
  id: PropTypes.string
};

export default Category;
