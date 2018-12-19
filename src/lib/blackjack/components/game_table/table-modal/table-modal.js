import React from "react";
import PropTypes from "prop-types";

import "./table-modal.css";

// constants for fixed size
const SMALL = "small";
const LARGE = "large";

const formatSize = (size) => {
  if (size) {
    const sizeString = size.toLowerCase();

    switch (sizeString) {
      case SMALL:
        return SMALL;
      case LARGE:
        return LARGE;
      default:
        return undefined;
    }
  }
  return undefined;
};

const TableModal = (props) => {
  const size = formatSize(props.size);

  return (
    <div className="table-modal" style={props.show ? { display: "flex" } : { display: "none" }} >
      <div className={size ? `table-modal-content table-modal-content-${size}` : "table-modal-content"}>
        {props.children}
      </div>
    </div>);
};

TableModal.propTypes = {
  children: PropTypes.any,
  show: PropTypes.bool,
  size: PropTypes.string,
};

const TableModalHeader = (props) => {
  return (<div className="table-modal-header">{props.children}</div>);
};

TableModalHeader.propTypes = {
  children: PropTypes.any,
};

const TableModalBody = (props) => {
  return (<div className="table-modal-body">{props.children}</div>);
};

TableModalBody.propTypes = {
  children: PropTypes.any,
};

const TableModalFooter = (props) => {
  return (<div className="table-modal-footer">{props.children}</div>);
};

TableModalFooter.propTypes = {
  children: PropTypes.any,
};

export default TableModal;

export { TableModalHeader };
export { TableModalFooter };
export { TableModalBody };