import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "../common-ui";

import "./game_header.css";

class GameHeader extends Component {

  render() {
    return (
      <div className="game-header">
        <div className="game-header-funds">
          $ {this.props.funds}
        </div>
        <div className="game-header-menu">
          <Button
            onClick={() => {console.log("options coming soon")}}
          >
            Menu
          </Button>
        </div>
      </div>
    );
  }
}

GameHeader.propTypes = {
  funds: PropTypes.number.isRequired,
  disableMenu: PropTypes.bool.isRequired,
};

export default GameHeader;