import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";

export default function Pencil({ id,...rest }) {
  const { goodId } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const toggleMenu = (status) => {
    setIsEdit(status);
  };

  // if (goodId !== id) {
  //   setStatus(true)
  // } else {
  //   setStatus(false)
  // }

  return (
    <>
      <Link to={`/admin/goods/${id}`} >
        <button {...rest} onClick={()=>toggleMenu(true)} disabled={goodId && goodId !== id}>
          <i
            className={"bi bi-pencil" + (isEdit ? "-fill" : "")}
          ></i>
        </button>
      </Link>
      <Link to={`/admin/goods`} >
        <button 
          onClick={()=>toggleMenu(false)}
          disabled={goodId && goodId !== id}
        >
          <i
            className={"bi bi-x-square"}
          ></i>
        </button>
      </Link>
    </>
  ); 
}
Pencil.propTypes = {
  id: PropTypes.string
};
