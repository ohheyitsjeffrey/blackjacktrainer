import React, { Component } from "react";
import Card from "./components/card/card.js";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Coming Soon</h1>
        <Card
          isFlipped={false}
          svgName="ace_of_spades"
        />
        <Card
          isFlipped={false}
          svgName="jack_of_spades"
        />
      </div>
    );
  }
}

export default App;
