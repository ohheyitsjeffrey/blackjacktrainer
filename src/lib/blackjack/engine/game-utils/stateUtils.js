import Shoe from "../shoe/shoe.js";
import Hand from "../hand/hand.js";

/*
state = {
    options: {
      minimumBet: betStep,
      dealerStands: 17,
    },
    funds: 1000,
    bet: betStep,
    betPlaced: false,
    shoe: newShoe,
    dealersHand: new Hand(),
    playersHands: [new Hand()],
    activeHand: 0,
    isPlayersTurn: false,
    isDealersTurn: false,
    waitForPlayerClick: false,
  };
}
*/

export function hasStateInLocalStorage() {
  // check for relevent keys to make sure there is a valid game state in local storage somewhere.
  // this allows existing gamestates to be overwritten if the game is updated with new needs.
  return (
    localStorage.getItem("options.minimumBet") !== null &&
    localStorage.getItem("funds") !== null &&
    localStorage.getItem("bet") !== null &&
    localStorage.getItem("betPlaced") !== null &&
    localStorage.getItem("shoe") !== null
  );
}

export function restoreState() {
  // restore previous values from local storage
  const restoredFunds = parseInt(localStorage.getItem("funds"), 10);
  const restoredBet = parseInt(localStorage.getItem("bet"), 10);
  const restoredBetPlaced = localStorage.getItem("betPlaced");

  const shoe = new Shoe();
  const shoeCardsAsString = localStorage.getItem("shoe");
  const restoredShoe = shoe.restoreFromString(shoeCardsAsString);

  const restoredOptions = {
    minimumBet: parseInt(localStorage.getItem("options.minimumBet"), 10),
  };

  // now restore the options object and return like new
  return {
    options: restoredOptions,
    funds: restoredFunds,
    bet: restoredBet,
    betPlaced: (restoredBetPlaced === "true"),
    shoe: restoredShoe,
    dealersHand: new Hand(),
    playersHands: [new Hand()],
    activeHand: 0,
  };
}

export function createNewState() {
  const newShoe = new Shoe(8);

  return {
    options: {
      minimumBet: betStep,
      dealerStands: 17,
    },
    funds: 1000,
    bet: betStep,
    betPlaced: false,
    shoe: newShoe,
    dealersHand: new Hand(),
    playersHands: [new Hand()],
    activeHand: 0,
    isPlayersTurn: false,
    isDealersTurn: false,
    waitForPlayerClick: false,
  };
}