import Shoe from "../shoe";
import Hand from "../hand";
import Card from "../card/card.js";

import {
  optionsAreValid,
  createNewState,
  hasStateInLocalStorage,
  writeGameStateToLocalStorage,
  playersHandsToString,
  restorePlayersHandsFromString,
} from "./stateUtils";

// this method will write a valid local state, assuming it has been updated if
// state has also been updated
const generateMockLocalStorageState = () => {
  localStorage.setItem("options.minimumBet", "test");
  localStorage.setItem("options.dealerStands", "test");
  localStorage.setItem("options.shoeSize", "test");
  localStorage.setItem("shoe", "test");
  localStorage.setItem("funds", "test");
  localStorage.setItem("bet", "test");
  localStorage.setItem("betPlaced", "test");
  localStorage.setItem("dealersHand", "test");
  localStorage.setItem("playersHands", "test");
  localStorage.setItem("activeHand", "test");
  localStorage.setItem("isPlayersTurn", "test");
  localStorage.setItem("isDealersTurn", "test");
  localStorage.setItem("waitForPlayerClick", "test");
  localStorage.setItem("modalMode", "test");
  localStorage.setItem("showModal", "test");
  localStorage.setItem("inhibitPlayerAction", "test");
};

beforeEach(() => {
  localStorage.clear();
});

// the default state that should be returned without parameters
const defaultStateMock = {
  options: {
    minimumBet: 10,
    shoeSize: 8,
    hitOnSoft17: false,
  },
  shoe: new Shoe(8),
  funds: 1000,
  bet: 10,
  betPlaced: false,
  dealersHand: new Hand(),
  playersHands: [new Hand()],
  activeHand: 0,
  isPlayersTurn: false,
  isDealersTurn: false,
  waitForPlayerClick: false,
  inhibitPlayerAction: false,
  modalMode: undefined,
};

// valid custom options
const customOptions = {
  hitOnSoft17: true,
  minimumBet: 10,
  shoeSize: 4,
};

// optionsAreValid() tests
it("optionsAreValid() returns true for valid options object", () => {
  const value = optionsAreValid(customOptions);
  expect(value).toBe(true);
});

it("optionsAreValid() returns false when no options are passed", () => {
  const value = optionsAreValid();
  expect(value).toBe(false);
});

it("optionsAreValid() returns false for missing keys", () => {
  const missingMinimumBetOptions = {
    hitOnSoft17: false,
    shoeSize: 4,
  };

  const missingDealerStandsOptions = {
    minimumBet: 10,
    shoeSize: 4,
  };

  const missingShoeSizeOptions = {
    minimumBet: 10,
    hitOnSoft17: false,
  };

  const missingMinimumBet = optionsAreValid(missingMinimumBetOptions);
  expect(missingMinimumBet).toBe(false);

  const missingDealerStands = optionsAreValid(missingDealerStandsOptions);
  expect(missingDealerStands).toBe(false);

  const missingShoeSize = optionsAreValid(missingShoeSizeOptions);
  expect(missingShoeSize).toBe(false);
});

it("optionsAreValid() returns false for keys of wrong value type", () => {
  const invalidMinimumBetOptions = {
    minimumBet: "10",
    dealerStands: 18,
    shoeSize: 4,
  };

  const invalidDealerStandsOptions = {
    minimumBet: 10,
    dealerStands: "18",
    shoeSize: 4,
  };

  const invalidShoeSizeOptions = {
    minimumBet: 10,
    dealerStands: 18,
    shoeSize: "4",
  };

  const invalidMinimumBet = optionsAreValid(invalidMinimumBetOptions);
  expect(invalidMinimumBet).toBe(false);

  const invalidDealerStands = optionsAreValid(invalidDealerStandsOptions);
  expect(invalidDealerStands).toBe(false);

  const invalidShoeSize = optionsAreValid(invalidShoeSizeOptions);
  expect(invalidShoeSize).toBe(false);
});

// createNewState()
it("createNewState() returns default state when no options are passed", () => {
  const newState = createNewState();

  // compare newState's values to defaultMockStatus's values to verify it was generated correctly
  expect(newState.options).toEqual(defaultStateMock.options);
  expect(newState.shoe.remainingCount()).toEqual(defaultStateMock.options.shoeSize * 52);
  expect(newState.funds).toEqual(defaultStateMock.funds);
  expect(newState.bet).toEqual(defaultStateMock.bet);
  expect(newState.betPlaced).toEqual(defaultStateMock.betPlaced);
  expect(newState.dealersHand.length()).toEqual(defaultStateMock.dealersHand.length());
  expect(newState.playersHands[0].length()).toEqual(defaultStateMock.playersHands[0].length());
  expect(newState.activeHand).toEqual(defaultStateMock.activeHand);
  expect(newState.isPlayersTurn).toEqual(defaultStateMock.isPlayersTurn);
  expect(newState.isDealersTurn).toEqual(defaultStateMock.isDealersTurn);
  expect(newState.waitForPlayerClick).toEqual(defaultStateMock.waitForPlayerClick);
});

it("createNewState() returns state with custom options when valid options are passed", () => {
  const newState = createNewState(customOptions);

  // compare newState's values to defaultMockStatus's values to verify it was generated correctly
  expect(newState.options).toEqual(customOptions);

  // verify all other keys exist, and those that should be changed by options have been
  expect(newState.shoe.remainingCount()).toEqual(customOptions.shoeSize * 52);
  expect(newState.funds).toEqual(defaultStateMock.funds);
  // bet should equal custom minimum bet
  expect(newState.bet).toEqual(customOptions.minimumBet);
  expect(newState.betPlaced).toEqual(defaultStateMock.betPlaced);
  expect(newState.dealersHand.length()).toEqual(defaultStateMock.dealersHand.length());
  expect(newState.playersHands[0].length()).toEqual(defaultStateMock.playersHands[0].length());
  expect(newState.activeHand).toEqual(defaultStateMock.activeHand);
  expect(newState.isPlayersTurn).toEqual(defaultStateMock.isPlayersTurn);
  expect(newState.isDealersTurn).toEqual(defaultStateMock.isDealersTurn);
  expect(newState.waitForPlayerClick).toEqual(defaultStateMock.waitForPlayerClick);
});

it("createNewState() returns default state when invalid options are passed", () => {
  const newState = createNewState({});

  // compare newState's values to defaultMockStatus's values to verify it was generated correctly
  expect(newState.options).toEqual(defaultStateMock.options);
  expect(newState.shoe.remainingCount()).toEqual(defaultStateMock.options.shoeSize * 52);
  expect(newState.funds).toEqual(defaultStateMock.funds);
  expect(newState.bet).toEqual(defaultStateMock.bet);
  expect(newState.betPlaced).toEqual(defaultStateMock.betPlaced);
  expect(newState.dealersHand.length()).toEqual(defaultStateMock.dealersHand.length());
  expect(newState.playersHands[0].length()).toEqual(defaultStateMock.playersHands[0].length());
  expect(newState.activeHand).toEqual(defaultStateMock.activeHand);
  expect(newState.isPlayersTurn).toEqual(defaultStateMock.isPlayersTurn);
  expect(newState.isDealersTurn).toEqual(defaultStateMock.isDealersTurn);
  expect(newState.waitForPlayerClick).toEqual(defaultStateMock.waitForPlayerClick);
});

// hasStateInLocalStorage()
it("hasStateInLocalStorage() returns true if valid state stored in local storage", () => {
  // create a valid state
  generateMockLocalStorageState();
  // verify it is detected by hasStateInLocalStorage()
  const hasState = hasStateInLocalStorage();
  expect(hasState).toBe(true);
});

it("hasStateInLocalStorage() returns false if no state stored in local storage", () => {
  // this should happen between each test but hey, lets verify that for the hell of it
  localStorage.clear();
  const hasState = hasStateInLocalStorage();

  expect(hasState).toBe(false);
});

it("hasStateInLocalStorage() returns false if incomplete state stored in local storage", () => {
  // set a few values to verify it will return false unless all are present
  localStorage.setItem("options.minimumBet", "test");
  localStorage.setItem("betPlaced", "test");
  localStorage.setItem("dealersHand", "test");
  localStorage.setItem("waitForPlayerClick", "test");

  const hasState = hasStateInLocalStorage();

  expect(hasState).toBe(false);
});

it("playersHandsToString() accurately stringifies a hand with one card", () => {
  const hand = new Hand();
  const card1 = new Card("hearts", "10");
  const card2 = new Card("spades", "6");

  hand.insert(card1);
  hand.insert(card2);

  const playersHands = [hand];
  const handString = playersHandsToString(playersHands);

  // should return the same thing as just an array.toString() of the card.toString() function
  const parsedValues = JSON.parse(handString);
  expect(parsedValues.hand).toEqual(hand.toString());

});

it("playersHandsToString() accurately stringifies multiple hands", () => {
  const hand1 = new Hand();
  const hand2 = new Hand();

  const card1 = new Card("hearts", "10");
  const card2 = new Card("spades", "6");
  const card3 = new Card("diamonds", "3");
  const card4 = new Card("clubs", "ace");

  hand1.insert(card1);
  hand1.insert(card2);

  hand2.insert(card3);
  hand2.insert(card4);

  const playersHands = [hand1, hand2];
  const handStrings = playersHandsToString(playersHands);

  const parsedValues = JSON.parse(`[${handStrings}]`);

  expect(parsedValues[0].hand).toEqual(hand1.toString());
  expect(parsedValues[1].hand).toEqual(hand2.toString());
});

it("playersHandsToString() accurately stringifies a hand with no cards", () => {
  const hand = new Hand();
  const playersHands = [hand];
  const handStrings = playersHandsToString(playersHands);

  const parsedValues = JSON.parse(handStrings);
  expect(parsedValues.hand).toEqual(hand.toString());
});

// writeStateToLocalStorage()
it("writeStateToLocalStorage() accurately writes values to local storage", () => {
  localStorage.clear();

  // write the defaultStateMock to local storage
  writeGameStateToLocalStorage(defaultStateMock);

  expect(localStorage.getItem("options.minimumBet")).toEqual("10");
  expect(localStorage.getItem("options.hitOnSoft17")).toEqual(null);
  expect(localStorage.getItem("options.shoeSize")).toEqual("8");
  expect(localStorage.getItem("shoe")).toEqual(defaultStateMock.shoe.toString());
  expect(localStorage.getItem("funds")).toEqual("1000");
  expect(localStorage.getItem("bet")).toEqual("10");
  expect(localStorage.getItem("betPlaced")).toEqual("false");
  expect(localStorage.getItem("dealersHand")).toEqual("empty");
  expect(localStorage.getItem("playersHands")).toEqual("{\"hand\":\"empty\"}");
  expect(localStorage.getItem("activeHand")).toEqual("0");
  expect(localStorage.getItem("isPlayersTurn")).toEqual("false");
  expect(localStorage.getItem("isDealersTurn")).toEqual("false");
  expect(localStorage.getItem("waitForPlayerClick")).toEqual("false");
  expect(localStorage.getItem("modalMode")).toEqual(null);
});

it("restorePlayersHands() accurately restores an array of one hand with cards", () => {
  const hand = new Hand();
  const card1 = new Card("hearts", "10");
  const card2 = new Card("spades", "6");

  hand.insert(card1);
  hand.insert(card2);

  const playersHands = [hand];
  const playersHandsString = playersHandsToString(playersHands);

  const restoredHands = restorePlayersHandsFromString(playersHandsString);

  // verify hands have the same attributes
  expect(restoredHands[0].value).toEqual(hand.value);
  expect(restoredHands[0].bust).toEqual(hand.bust);
  expect(restoredHands[0].stand).toEqual(hand.stand);
  expect(restoredHands[0].cards.length).toEqual(hand.cards.length);
});

it("restorePlayersHands() accurately restores an array of one hand with no cards", () => {
  const hand = new Hand();

  const playersHands = [hand];
  const playersHandsString = playersHandsToString(playersHands);

  const restoredHands = restorePlayersHandsFromString(playersHandsString);

  // verify hands have the same attributes
  expect(restoredHands[0].value).toEqual(hand.value);
  expect(restoredHands[0].bust).toEqual(hand.bust);
  expect(restoredHands[0].stand).toEqual(hand.stand);
  expect(restoredHands[0].cards.length).toEqual(hand.cards.length);

});

it("restorePlayersHands() accurately restores an array of two hands with cards", () => {
  const hand1 = new Hand();
  const hand2 = new Hand();

  const card1 = new Card("hearts", "10");
  const card2 = new Card("spades", "6");
  const card3 = new Card("diamonds", "3");
  const card4 = new Card("clubs", "ace");

  hand1.insert(card1);
  hand1.insert(card2);

  hand2.insert(card3);
  hand2.insert(card4);

  const playersHands = [hand1, hand2];
  const playersHandsString = playersHandsToString(playersHands);

  const restoredHands = restorePlayersHandsFromString(playersHandsString);

  // verify hand1 and restored hand1 have the same attributes
  expect(restoredHands[0].value).toEqual(hand1.value);
  expect(restoredHands[0].bust).toEqual(hand1.bust);
  expect(restoredHands[0].stand).toEqual(hand1.stand);
  expect(restoredHands[0].cards.length).toEqual(hand1.cards.length);

  // verify hand2 and restored hand2 have the same attributes
  expect(restoredHands[1].value).toEqual(hand2.value);
  expect(restoredHands[1].bust).toEqual(hand2.bust);
  expect(restoredHands[1].stand).toEqual(hand2.stand);
  expect(restoredHands[1].cards.length).toEqual(hand2.cards.length);
});


