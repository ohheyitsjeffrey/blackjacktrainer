import { suitsAndValues } from "../suitsAndValues.js";

class Card {
  constructor(suit, value) {
    
    if (!suitsAndValues.suits.includes(suit)) {
      throw new Error(`Not a valid card suit.  Valid suites are: ${suitsAndValues.suits}`);
    }
    if (!suitsAndValues.values.includes(value)) {
      throw new Error(`Not a valid card value.  Valid values are: ${suitsAndValues.values}`);
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

  toString() {
    return JSON.stringify({
      suit: this.suit,
      value: this.value,
    });
  }

}

export default Card;