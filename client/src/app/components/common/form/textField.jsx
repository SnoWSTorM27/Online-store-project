import React, { useState } from "react";
import PropTypes from "prop-types";
import InputMask from "react-input-mask";
import { IMaskInput } from "react-imask";

function TextField({ label, type, name, value, onChange, error, ...rest }) {
  const [showPassword, setShowPassword] = useState(false);
  
  const placeholder="+7(999)999-99-99"; 
  // const pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"; 
  const maskChar="-";
  const PhoneMask = "+7(000)000-0000";

  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const handleMaskedChange = (inputName) => {
    return (value, mask) => {
      onChange({ name: inputName, value });
    };
  };
  if (type === "tel") {
    return (
      <div className="mb-4">
        <label htmlFor={name}>{label}</label>
        <div className="input-group has-validation">
          <IMaskInput
            mask={PhoneMask}
            radix={maskChar}
            value={value}
            className={getInputClasses()}
            {...rest}
            onAccept={handleMaskedChange(name)}
            placeholder="+7(999)999-99-99"
          />
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      </div>
    );
  } else {
    return (
      <div className="mb-4">
        <label htmlFor={name}>{label}</label>
        <div className="input-group has-validation">
          <input
            type={showPassword ? "text" : type}
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            className={getInputClasses()}
            {...rest}
          />
          {type === "password" && (<button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowPassword}
          >
            <i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
          </button>)}
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      </div>
    );
  }
};
TextField.defaultProps = {
  type: "text"
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default TextField;
