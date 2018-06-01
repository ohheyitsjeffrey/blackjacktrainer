import Shoe from "./shoe/shoe.js";

class BlackJackEngine {
  constructor() {
    this.gameState = this.restoreGameState()
      ? this.restoreGameState()
      : this.createNewGameState();
    
    this.writeCurrentGameState();
  }
  // create a new game state for the engine to reference 
  createNewGameState() {
    return {
      shoe: new Shoe(8),
    };
  }

  restoreGameState() {
    return  localStorage.getItem("gameState");
  }

  writeCurrentGameState() {
    if (this.gameState) {
      localStorage.setItem("gameState", this.gameState);
    }
  }
}

export default BlackJackEngine;