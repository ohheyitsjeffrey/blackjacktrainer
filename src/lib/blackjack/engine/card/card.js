import { suitsAndValues } from "../game-utils";

const suits = suitsAndValues.suits;
const values = suitsAndValues.values;

export default class Card {
  constructor(suit, value) {
    if (!suits.includes(suit)) {
      throw new Error(`Not a valid card suit.  Valid suites are: ${suits}`);
    }
    if (!values.includes(value)) {
      throw new Error(`Not a valid card value.  Valid values are: ${values}`);
    }

    this.suit = suit;
    this.value = value;
  }
  // for handling face cards when checking value for splits and such
  cardValue() {
    if (this.value === "jack" ||
      this.value === "queen" ||
      this.value === "king") {
      return "10";
    }
    return this.value;
  }

  // returns a string of the json object of the card for restoring shoes and hands
  toString() {
    return JSON.stringify({
      suit: this.suit,
      value: this.value,
    });
  }

}