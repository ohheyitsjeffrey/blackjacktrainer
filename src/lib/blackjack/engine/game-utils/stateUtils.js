import Shoe from "../shoe";
import Hand from "../hand";
import _ from "lodash";
import MODALMODES from "./modalModes";

// default options if no options are passed in createNewState()
const defaultOptions = {
  minimumBet: 10,
  shoeSize: 8,
  hitOnSoft17: true,
  insurance: true,
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
    inhibitPlayerAction: false,
    modalMode: MODALMODES.PLACEBET,
    hasInsurance: false,
  };
};

// this function is only exported to test in jest and is not exported in index.js
export function optionsAreValid(options) {
  return !_.isNil(options) &&
    !_.isNil(options.minimumBet) && typeof (options.minimumBet) === "number" &&     // has minimumBet of type number
    !_.isNil(options.shoeSize) && typeof (options.shoeSize) === "number" &&         // has shoeSize of type number
    !_.isNil(options.hitOnSoft17) && typeof (options.hitOnSoft17) === "boolean" &&  // has dealerStands of type number
    !_.isNil(options.insurance) && typeof (options.insurance) === "boolean";        // has dealerStands of type number
}

export function hasStateInLocalStorage() {
  // check for relevent keys to make sure there is a valid game state in local storage somewhere.
  // this allows existing gamestates to be overwritten if the game is updated with new needs.
  return (
    // has options
    localStorage.getItem("options.minimumBet") !== null &&
    localStorage.getItem("options.dealerStands") !== null &&
    localStorage.getItem("options.shoeSize") !== null &&
    localStorage.getItem("options.insurance") !== null &&
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
    localStorage.getItem("modalMode") !== null &&
    localStorage.getItem("waitForPlayerClick") !== null &&
    localStorage.getItem("inhibitPlayerAction") !== null
  );
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
    const handObjectString = { hand: hand.toString() };
    stringArray.push(JSON.stringify(handObjectString));
  });
  return stringArray.toString();
}

// only exported here for testing purposes, not exported in
export function restorePlayersHandsFromString(playersHands) {
  const hands = [];
  const convertedArray = JSON.parse(`[${playersHands}]`);

  _.forEach(convertedArray, handString => {
    // convert the strings to hands
    const restoredHand = new Hand();
    restoredHand.restoreFromString(handString.hand);
    hands.push(restoredHand);
  });

  return hands;
}

export function writeGameStateToLocalStorage(state) {
  localStorage.setItem("options.minimumBet", state.options.minimumBet);
  localStorage.setItem("options.hitOnSoft17", state.options.hitOnSoft17);
  localStorage.setItem("options.shoeSize", state.options.shoeSize);
  localStorage.setItem("options.insurance", state.options.insurance);
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
  localStorage.setItem("modalMode", state.modalMode);
  localStorage.setItem("inhibitPlayerAction", state.inhibitPlayerAction);
}

export function restoreStateFromLocalStorage() {
  // restore previous values from local storage

  // convert them and put them in restoredState
  const restoredState = {};

  return restoredState;
}