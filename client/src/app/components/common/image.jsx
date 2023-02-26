import React from "react";
import PropTypes from "prop-types";

export default function Image({ img, ...rest }) {
  

  return (
    <button {...rest}>
      <i
        width="25"
        height="25"
        className="bi bi-image"
        role="button"
      ></i>
    </button>
    
  );
}
Image.propTypes = {
  img: PropTypes.string
};
