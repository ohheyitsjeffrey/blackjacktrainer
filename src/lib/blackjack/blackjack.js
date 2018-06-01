import React, { Component } from "react";

import Controls from "./components/controls/controls.js";
import GameHeader from "./components/game_header/game_header.js";
import GameTable from "./components/game_table/game_table.js";

import BlackJackEngine from "./engine/blackJackEngine.js";

import "./blackjack.css";

class BlackJack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: new BlackJackEngine(),
    };
  }

  render() {
    return (
      <div className="blackjack">
        <GameHeader />
        <GameTable />
        <Controls />
      </div>
    );
  }
}

export default BlackJack;