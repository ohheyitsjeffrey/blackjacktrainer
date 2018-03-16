import React, { Component } from "react";
import { Button } from "react-bootstrap";

import "./controls.css";
// import PropTypes from "prop-types";

class Controls extends Component {

  // This could just be a justified button group, but those don't seem to want 
  // to work in react-bootstrap, so this is achieved using block buttons and flexbox 
  render() {
    return (
      <div className="controls">
        <div className="control-wrapper">
          <Button block disabled={true}>Split</Button>
        </div>
        <div className="control-wrapper">
          <Button block>Double</Button>
        </div>
        <div className="control-wrapper">
          <Button block bsStyle="danger">Stand</Button>
        </div>
        <div className="control-wrapper">
          <Button block bsStyle="primary">Hit</Button>
        </div>
      </div>
    );
  }
}

export default Controls;