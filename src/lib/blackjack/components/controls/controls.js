import React, { Component } from "react";
import { Button } from "react-bootstrap";

import "./controls.css";

class Controls extends Component {

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
          <Button block>Stand</Button>
        </div>
        <div className="control-wrapper">
          <Button block>Hit</Button>
        </div>
      </div>
    );
  }
}

export default Controls;