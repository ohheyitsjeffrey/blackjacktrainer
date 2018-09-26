import Shoe from "../shoe/shoe.js";
import Hand from "../hand/hand.js";
import _ from "lodash";

// will eventually be customizable but constant for now.
const BETSTEP = 5;

// default options if no options are passed in createNewState()
const defaultOptions = {
  minimumBet: BETSTEP,
  dealerStands: 17,
  shoeSize: 8,
};

// create a new state object for blackjack game, called in createNewState.
// passes defaulOptions if none are specified.
const newState = (options) => {
  return {
    options,
    shoe: new Shoe(options.shoeSize),
    funds: 1000,
    bet: options.minimumBet,
    betPlaced: false,
    dealersHand: new Hand(),
    playersHands: [new Hand()],
    activeHand: 0,
    isPlayersTurn: false,
    isDealersTurn: false,
    waitForPlayerClick: false,
  };
};

// this function is only exported to test in jest and is not exported in index.js
export function optionsAreValid(options) {
  return !_.isNil(options) &&
    !_.isNil(options.minimumBet) && typeof (options.minimumBet) === "number" &&   // has minimumBet of type number
    !_.isNil(options.shoeSize) && typeof (options.shoeSize) === "number" &&       // has shoeSize of type number
    !_.isNil(options.dealerStands) && typeof (options.dealerStands) === "number";  // has dealerStands of type number
}

export function hasStateInLocalStorage() {
  // check for relevent keys to make sure there is a valid game state in local storage somewhere.
  // this allows existing gamestates to be overwritten if the game is updated with new needs.
  return (
    // has options
    localStorage.getItem("options.minimumBet") !== null &&
    localStorage.getItem("options.dealerStands") !== null &&
    localStorage.getItem("options.shoeSize") !== null &&
    // has other state elements
    localStorage.getItem("shoe") !== null &&
    localStorage.getItem("funds") !== null &&
    localStorage.getItem("bet") !== null &&
    localStorage.getItem("betPlaced") !== null &&
    localStorage.getItem("dealersHand") !== null &&
    localStorage.getItem("playersHands") !== null &&
    localStorage.getItem("activeHand") !== null &&
    localStorage.getItem("isPlayersTurn") !== null &&
    localStorage.getItem("isDealersTurn") !== null &&
    localStorage.getItem("waitForPlayerClick") !== null
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

export function createNewState(options) {
  // const newShoe = new Shoe(8);
  return optionsAreValid(options)
    ? newState(options)
    : newState(defaultOptions);
}

// only exported here for testing purposes, not exported in
export function playersHandsToString(playersHands) {
  const stringArray = [];
  playersHands.forEach((hand) => {
    stringArray.push(hand.toString());
  });
  return stringArray.toString();
}

// only exported here for testing purposes, not exported in
export function restorePlayersHandsFromString(playersHands) {
  const hands = [];
  const convertedArray = JSON.parse(`[${playersHands}]`);

  _.forEach(convertedArray, handString => {
    // convert the strings to hands
    const hand = new Hand();
    hand.restoreFromString(handString);
    hands.push(hand);
  });

  return hands;
}

export function writeGameStateToLocalStorage(state) {
  localStorage.setItem("options.minimumBet", state.options.minimumBet);
  localStorage.setItem("options.dealerStands", state.options.dealerStands);
  localStorage.setItem("options.shoeSize", state.options.shoeSize);
  localStorage.setItem("shoe", state.shoe.toString());
  localStorage.setItem("funds", state.funds);
  localStorage.setItem("bet", state.bet);
  localStorage.setItem("betPlaced", state.betPlaced);
  localStorage.setItem("dealersHand", state.dealersHand.toString());
  localStorage.setItem("playersHands", playersHandsToString(state.playersHands));
  localStorage.setItem("activeHand", state.activeHand);
  localStorage.setItem("isPlayersTurn", state.isPlayersTurn);
  localStorage.setItem("isDealersTurn", state.isDealersTurn);
  localStorage.setItem("waitForPlayerClick", state.waitForPlayerClick);
}


