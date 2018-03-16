import React, { Component } from "react";

import CardTable from "../card_table/card_table.js";
import Controls from "../controls/controls.js";
import GameHeader from "./game_header.js";

import  "./game.css";

class Game extends Component {

  render() {
    return (
      <div className="game">
        <GameHeader />
        <CardTable />
        <Controls />
      </div>
    );
  }
}

export default Game;