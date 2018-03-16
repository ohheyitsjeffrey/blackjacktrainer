import React, { Component } from "react";
import Game from "./components/game/game.js";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game />
        <p>
          A game for the masses to count their cards with.  
          I will write a description when the app is done.
        </p> 
      </div>
    );
  }
}

export default App;
