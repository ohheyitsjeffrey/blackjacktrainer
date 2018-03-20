import React, { Component } from "react";
import BlackJack from "./lib/blackjack/blackjack.js";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BlackJack />
      </div>
    );
  }
}

export default App;
