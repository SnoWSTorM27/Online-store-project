import React, { useState } from "react";
import PropTypes from "prop-types";
import Dropdown from "react-bootstrap/Dropdown";

function DropDown({ label, onSorted, name}) {
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen(prevState => !prevState);
  };
  return (
    <Dropdown className="d-inline mx-2 " variant="success">
      <Dropdown.Toggle id="dropdown-autoclose-true" variant="success">
        {label}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>onSorted("asc", name)} >По взрастанию</Dropdown.Item>
        <Dropdown.Item onClick={()=>onSorted("desc", name)} >По убыванию</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    // <div className="dropdown-center">
    //   <button onClick={toggleMenu} className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
    //     {label}
    //   </button>
    //   <ul className={"dropdown-menu " + (isOpen ? " show" : "")} >
    //     <li><button  onClick={()=>onSorted("asc")} className="dropdown-item">По взрастанию</button></li>
    //     <li><button onClick={()=>onSorted("desc")} className="dropdown-item">По убыванию</button></li>
    //   </ul>
    // </div>
  );
}
DropDown.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onSorted: PropTypes.func
};

export default DropDown;
