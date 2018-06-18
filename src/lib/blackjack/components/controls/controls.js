import React, { Component } from "react";
import PropTypes from "prop-types";

import { Button } from "react-bootstrap";

import "./controls.css";

class Controls extends Component {
  constructor(props, context) {
    super(props, context);

    this.hit = this.hit.bind(this);
    this.stand = this.stand.bind(this);
    this.double = this.double.bind(this);
    this.split = this.split.bind(this);
  }

  hit() {
    this.props.hit();
  }

  stand() {
    this.props.stand();
  }

  double() {
    this.props.double();
  }

  split() {
    this.props.split();
  }

  render() {
    return (
      <div className="controls">
        <div className="control-wrapper">
          <Button block 
            onClick={this.props.split}
            disabled={!this.props.canSplit}
          >Split</Button>
        </div>
        <div className="control-wrapper">
          <Button block
            onClick={this.double}
            disabled={!this.props.canDouble}
          >Double</Button>
        </div>
        <div className="control-wrapper">
          <Button block
            onClick={this.stand}
            disabled={!this.props.canStand}
          >Stand</Button>
        </div>
        <div className="control-wrapper">
          <Button block
            onClick={this.hit}
            disabled={!this.props.canHit}
          >
            Hit
          </Button>
        </div>
      </div>
    );
  }
}

Controls.propTypes = {
  split: PropTypes.func,
  double: PropTypes.func,
  stand: PropTypes.func,
  hit: PropTypes.func,
  canSplit: PropTypes.bool,
  canDouble: PropTypes.bool,
  canStand: PropTypes.bool,
  canHit: PropTypes.bool,
};

export default Controls;