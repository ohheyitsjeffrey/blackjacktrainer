import React from "react";
import PropTypes from "prop-types";

import "./button.css";

const Button = (props) => {
  return (
    <button
      className="blackjacktrainer-button"
      onClick={props.onClick}
      disabled={props.disabled}
      style={props.fullWidth ? { width: "100%" } : {}}
    >
      {props.children}
    </button>);
};

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.any,
  fullWidth: PropTypes.bool,
};

export default Button;