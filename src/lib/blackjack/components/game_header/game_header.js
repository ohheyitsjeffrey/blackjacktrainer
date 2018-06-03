import React, { Component } from "react";
import PropTypes from "prop-types";
import { DropdownButton, MenuItem } from "react-bootstrap";

import "./game_header.css";

class GameHeader extends Component {

  render() {
    return (
      <div className="game-header">
        <div className="game-header-funds">
          $ {this.props.funds}
        </div>
        <div className="game-header-menu">
          <DropdownButton
            title="menu"
            pullRight={true}
            id="game-options-menu"
          // key={i}
          >
            <MenuItem eventKey="1">Action</MenuItem>
            <MenuItem eventKey="2">Another action</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="4">Separated link</MenuItem>
          </DropdownButton>
        </div>
      </div>
    );
  }
}

GameHeader.propTypes = {
  funds: PropTypes.number.isRequired,
};


export default GameHeader;