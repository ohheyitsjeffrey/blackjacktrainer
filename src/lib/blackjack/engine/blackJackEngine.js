import Shoe from "./shoe/shoe.js";

export default class BlackJackEngine {
  constructor() {
    this.hasGameStateInLocalStorage()
      ? this.restoreGameState()
      : this.createNewGameState();
  }
  // create a new game state for the engine to reference 
  createNewGameState() {
    this.funds = 1000;
    this.bet = undefined;
    this.shoe = new Shoe(8);
    // this.hands = {
    //   dealer: [],
    //   player: [],
    // };
    this.writeGameStateToLocalStorage();
  }

  // utility methods for the game engine
  hasGameStateInLocalStorage() {
    // check for relevent keys to make sure there is a valid game state in local storage somewhere.
    return (
      localStorage.getItem("funds") !== null &&
      localStorage.getItem("bet") !== null &&
      localStorage.getItem("shoe") !== null
    );
  }

  restoreGameState() {
    // restore funds
    this.funds = parseInt(localStorage.getItem("funds"), 10);
    // restore bet if it exists
    this.bet = localStorage.getItem("bet") === undefined
      ? undefined
      : parseInt(localStorage.getItem("bet"), 10);  
    // create shoe, get shoe card array stored as string in local storage, and use restore function
    // to re-initiate it.
    this.shoe = new Shoe();
    const shoeCardsAsString = localStorage.getItem("shoe");
    this.shoe.restoreFromString(shoeCardsAsString);
  }

  writeGameStateToLocalStorage() {
    localStorage.setItem("funds", this.funds);
    localStorage.setItem("bet", this.bet);
    localStorage.setItem("shoe", this.shoe.toString());
  }

  clearRound() {
    this.bet = undefined;
    this.hands = {
      dealer: [],
      player: [],
    };
  }
}
