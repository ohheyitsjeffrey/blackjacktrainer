
import Shoe from "../shoe/shoe.js";
import Hand from "../hand/hand.js";
import Card from "../card/card.js";

import {
  optionsAreValid,
  createNewState,
  hasStateInLocalStorage,
  writeGameStateToLocalStorage,
  restoreState,
  playersHandsToString,
  restorePlayersHandsFromString,
} from "./stateUtils";

// this method will write a valid local state, assuming it has been updated if
// state has also been updated
const generateValidLocalStorageState = () => {
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
};

beforeEach(() => {
  localStorage.clear();
});

// the default state that should be returned without parameters
const defaultStateMock = {
  options: {
    minimumBet: 5,
    dealerStands: 17,
    shoeSize: 8,
  },
  shoe: new Shoe(8),
  funds: 1000,
  bet: 5,
  betPlaced: false,
  dealersHand: new Hand(),
  playersHands: [new Hand()],
  activeHand: 0,
  isPlayersTurn: false,
  isDealersTurn: false,
  waitForPlayerClick: false,
};

// valid custom options
const customOptions = {
  minimumBet: 10,
  dealerStands: 18,
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
    dealerStands: 18,
    shoeSize: 4,
  };

  const missingDealerStandsOptions = {
    minimumBet: 10,
    shoeSize: 4,
  };

  const missingShoeSizeOptions = {
    minimumBet: 10,
    dealerStands: 18,
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
  generateValidLocalStorageState();
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

  const cardStringArray = [card1.toString(), card2.toString()];
  const playersHands = [hand];
  const handString = playersHandsToString(playersHands);

  // should return the same thing as just an array.toString() of the card.toString() function
  expect(handString).toEqual(cardStringArray.toString());
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

  // string should include the toString() values of each hand
  expect(handStrings.includes(hand1.toString())).toBe(true);
  expect(handStrings.includes(hand2.toString())).toBe(true);
});

it("playersHandsToString() accurately stringifies a hand with no cards", () => {
  const hand = new Hand();
  const playersHands = [hand];
  const handStrings = playersHandsToString(playersHands);

  expect(handStrings).toEqual("empty");
});

it("playersHandsToString() converts back to an array of strings", () => {
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

  console.log(handStrings);


});

// writeStateToLocalStorage()
it("writeStateToLocalStorage() accurately writes values to local storage", () => {
  localStorage.clear();

  // write the defaultStateMock to local storage
  writeGameStateToLocalStorage(defaultStateMock);

  expect(localStorage.getItem("options.minimumBet")).toEqual("5");
  expect(localStorage.getItem("options.dealerStands")).toEqual("17");
  expect(localStorage.getItem("options.shoeSize")).toEqual("8");
  expect(localStorage.getItem("shoe")).toEqual(defaultStateMock.shoe.toString());
  expect(localStorage.getItem("funds")).toEqual("1000");
  expect(localStorage.getItem("bet")).toEqual("5");
  expect(localStorage.getItem("betPlaced")).toEqual("false");
  expect(localStorage.getItem("dealersHand")).toEqual("empty");
  expect(localStorage.getItem("playersHands")).toEqual("empty");
  expect(localStorage.getItem("activeHand")).toEqual("0");
  expect(localStorage.getItem("isPlayersTurn")).toEqual("false");
  expect(localStorage.getItem("isDealersTurn")).toEqual("false");
  expect(localStorage.getItem("waitForPlayerClick")).toEqual("false");
});

it("restorePlayersHands() accurately restores an array of one hand with cards", () => {
  const hand = new Hand();
  const card1 = new Card("hearts", "10");
  const card2 = new Card("spades", "6");

  hand.insert(card1);
  hand.insert(card2);

  const playersHands = [hand];
  const playersHandsString = playersHandsToString(playersHands);

  console.log(playersHandsString)

  // const restoredHands = restorePlayersHandsFromString(playersHandsString);
  // console.log(restoredHands);

});

it("restorePlayersHands() accurately restores an array of one hand no cards", () => {

});

it("restorePlayersHands() accurately restores an array of two hands with cards", () => {
  // const hand1 = new Hand();
  // const hand2 = new Hand();

  // const card1 = new Card("hearts", "10");
  // const card2 = new Card("spades", "6");
  // const card3 = new Card("diamonds", "3");
  // const card4 = new Card("clubs", "ace");

  // hand1.insert(card1);
  // hand1.insert(card2);

  // hand2.insert(card3);
  // hand2.insert(card4);


  // const playersHands = [hand1, hand2];
  // const handStrings = playersHandsToString(playersHands);
});

it("restorePlayersHands() accurately restores an array of two hands withno cards", () => {

});
