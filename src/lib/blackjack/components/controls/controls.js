import React, { Component } from "react";
import PropTypes from "prop-types";

import { Button } from "react-bootstrap";

import "./controls.css";

class Controls extends Component {
  constructor(props, context) {
    super(props, context);

    this.hit = this.hit.bind(this);
  }

  hit() {
    this.props.hit();
  }

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
          <Button block
            onClick={this.hit}
          >Hit</Button>
        </div>
      </div>
    );
  }
}

Controls.propTypes = {
  hit: PropTypes.func,
};

export default Controls;