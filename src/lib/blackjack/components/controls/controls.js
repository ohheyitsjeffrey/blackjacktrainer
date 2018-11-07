import React, { Component } from "react";
import PropTypes from "prop-types";

// import { Button } from "react-bootstrap";
import { Button } from "../common-ui";

import "./controls.css";

const Controls = (props) => {
  return (
    <div className="controls">
      <div className="control-wrapper">
        <Button
          fullWidth
          onClick={props.split}
          disabled={!props.canSplit}
        >
          Split
        </Button>
      </div>
      <div className="control-wrapper">
        <Button
          fullWidth
          onClick={props.double}
          disabled={!props.canDouble}
        >
          Double
        </Button>
      </div>
      <div className="control-wrapper">
        <Button
          fullWidth
          onClick={props.stand}
          disabled={!props.canStand}
        >
          Stand
        </Button>
      </div>
      <div className="control-wrapper">
        <Button
          fullWidth
          onClick={props.hit}
          disabled={!props.canHit}
        >
          Hit
        </Button>
      </div>
    </div>
  );
};

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