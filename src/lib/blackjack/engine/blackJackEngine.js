import Shoe from "./shoe/shoe.js";

export default class BlackJackEngine {
  constructor() {
    this.gameState = this.restoreGameState()
      ? this.restoreGameState()
      : this.createNewGameState();
    
    this.writeCurrentGameState();
  }
  // create a new game state for the engine to reference 
  createNewGameState() {
    return {
      actions: {},               // coming soon                
      options: {},               // coming soon
      funds: 1000,
      shoe: new Shoe(8),
      hands:{
        dealer: [],
        player: [],
      },
    };
  }

  restoreGameState() {
    return localStorage.getItem("gameState");
  }

  writeCurrentGameState() {
    if (this.gameState) {
      localStorage.setItem("gameState", this.gameState);
    }
  }

  clearRound() {
    this.data.funds = undefined; 
    this.data.hands = {
      dealer: [],
      player: [],   
    };
  }
}
