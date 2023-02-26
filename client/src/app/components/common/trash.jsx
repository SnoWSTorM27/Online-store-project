import React, { useState } from "react";
import PropTypes from "prop-types";

export default function Trash({ ...rest }) {

  return (
    <button>
      <i
        {...rest}
        role="button"
        className={"bi bi-trash"}
      ></i>
    </button>
    
  ); 
}
Trash.propTypes = {
  status: PropTypes.bool
};
