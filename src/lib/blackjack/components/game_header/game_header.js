import React from "react";
import PropTypes from "prop-types";
import { Button } from "../common-ui";

import "./game_header.css";

const GameHeader = (props) => {
  return (
    <div className="game-header">
      <div className="game-header-funds">
        $ {props.funds}
      </div>
      <div className="game-header-menu">
        <Button
          onClick={props.toggleOptions}
          disabled={props.disableMenu}
        >
          Menu
        </Button>
      </div>
    </div>
  );
};

GameHeader.propTypes = {
  funds: PropTypes.number,
  disableMenu: PropTypes.bool,
  toggleOptions: PropTypes.func,
};

export default GameHeader;